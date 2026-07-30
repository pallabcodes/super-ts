/**
 * Capability: Bounded Circular Storage
 * Fixed-capacity allocation storage for sequential data streaming.
 */
export class BoundedCircularStorage<T> {
  private buffer: Array<T | undefined>;
  private head = 0;
  private tail = 0;
  private count = 0;

  constructor(public readonly capacity: number) {
    this.buffer = new Array<T | undefined>(capacity);
  }

  write(item: T): boolean {
    if (this.count === this.capacity) return false;
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    this.count++;
    return true;
  }

  read(): T | undefined {
    if (this.count === 0) return undefined;
    const val = this.buffer[this.head];
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.count--;
    return val;
  }

  get size(): number {
    return this.count;
  }
}
