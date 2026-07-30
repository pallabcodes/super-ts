/**
 * Capability: Task Priority Dispatcher
 * Dispatches items according to weighted rank or importance level.
 */
export class TaskPriorityDispatcher<T> {
  private queue: { item: T; rank: number }[] = [];

  enqueue(item: T, rank: number): void {
    this.queue.push({ item, rank });
    this.queue.sort((a, b) => a.rank - b.rank);
  }

  dequeue(): T | undefined {
    return this.queue.shift()?.item;
  }

  get size(): number {
    return this.queue.length;
  }
}
