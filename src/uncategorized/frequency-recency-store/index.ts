/**
 * Capability: Frequency Recency Store
 * Key-value state storage with automatic stale item eviction.
 */
export class FrequencyRecencyStore<K, V> {
  private store = new Map<K, V>();

  constructor(public readonly limit: number) {}

  get(key: K): V | undefined {
    if (!this.store.has(key)) return undefined;
    const value = this.store.get(key)!;
    this.store.delete(key);
    this.store.set(key, value);
    return value;
  }

  set(key: K, value: V): void {
    if (this.store.has(key)) {
      this.store.delete(key);
    } else if (this.store.size >= this.limit) {
      const firstKey = this.store.keys().next().value;
      if (firstKey !== undefined) this.store.delete(firstKey);
    }
    this.store.set(key, value);
  }

  get size(): number {
    return this.store.size;
  }
}
