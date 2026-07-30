/**
 * Memory Management Subsystem
 * Focus: High-efficiency data layout, contiguous buffer allocations, object pooling.
 */

export interface AllocationBuffer<T> {
  capacity: number;
  size: number;
  push(item: T): boolean;
  pop(): T | undefined;
  clear(): void;
}

/**
 * RingBuffer - Fixed-size contiguous buffer allocator
 */
export class RingBuffer<T> implements AllocationBuffer<T> {
  private buffer: Array<T | undefined>;
  private head = 0;
  private tail = 0;
  private _size = 0;

  constructor(public readonly capacity: number) {
    this.buffer = new Array<T | undefined>(capacity);
  }

  get size(): number {
    return this._size;
  }

  push(item: T): boolean {
    if (this._size === this.capacity) {
      return false;
    }
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    this._size++;
    return true;
  }

  pop(): T | undefined {
    if (this._size === 0) return undefined;
    const item = this.buffer[this.head];
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this._size--;
    return item;
  }

  clear(): void {
    this.buffer.fill(undefined);
    this.head = 0;
    this.tail = 0;
    this._size = 0;
  }
}
