/**
 * Capability: Dispatching
 * Action ordering, rank-based prioritization, event emission step.
 */
export class Dispatcher<T> {
  private queue: { item: T; priority: number }[] = [];

  dispatch(item: T, priority = 0): void {
    this.queue.push({ item, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  next(): T | undefined {
    return this.queue.shift()?.item;
  }
}
