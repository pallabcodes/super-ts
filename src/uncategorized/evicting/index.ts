/**
 * Capability: Evicting
 * Generic retention policies, capacity trimming, stale item eviction.
 */
export class Evictor<K, V> {
  private items = new Map<K, V>();

  constructor(public readonly limit: number) {}

  touch(key: K, value: V): void {
    if (this.items.has(key)) {
      this.items.delete(key);
    } else if (this.items.size >= this.limit) {
      const oldest = this.items.keys().next().value;
      if (oldest !== undefined) this.items.delete(oldest);
    }
    this.items.set(key, value);
  }

  fetch(key: K): V | undefined {
    if (!this.items.has(key)) return undefined;
    const val = this.items.get(key)!;
    this.items.delete(key);
    this.items.set(key, val);
    return val;
  }
}
