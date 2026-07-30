/**
 * Loose capability: Priority Queue
 * Can be used standalone or integrated into reactive schedulers/engines later.
 */
export class PriorityQueue<T> {
  private items: { item: T; priority: number }[] = [];

  enqueue(item: T, priority: number): void {
    this.items.push({ item, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): T | undefined {
    return this.items.shift()?.item;
  }

  get size(): number {
    return this.items.length;
  }
}
