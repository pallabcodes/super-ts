/**
 * Caching & State Subsystem
 * Focus: Key-value caching, eviction policies, reactive state tracking.
 */

export interface CacheStore<K, V> {
  get(key: K): V | undefined;
  set(key: K, value: V): void;
  has(key: K): boolean;
}

export class EvictionCache<K, V> implements CacheStore<K, V> {
  private store = new Map<K, V>();

  constructor(public readonly maxEntries: number) {}

  get(key: K): V | undefined {
    if (!this.store.has(key)) return undefined;
    const val = this.store.get(key)!;
    // Refresh position for LRU semantics
    this.store.delete(key);
    this.store.set(key, val);
    return val;
  }

  set(key: K, value: V): void {
    if (this.store.has(key)) {
      this.store.delete(key);
    } else if (this.store.size >= this.maxEntries) {
      const oldestKey = this.store.keys().next().value;
      if (oldestKey !== undefined) {
        this.store.delete(oldestKey);
      }
    }
    this.store.set(key, value);
  }

  has(key: K): boolean {
    return this.store.has(key);
  }

  get size(): number {
    return this.store.size;
  }
}
