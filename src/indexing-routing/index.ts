/**
 * Indexing & Routing Subsystem
 * Focus: Entity hierarchies, spatial partitioning, routing graphs, prefix search.
 */

export interface SearchIndex<K, V> {
  insert(key: K, value: V): void;
  find(key: K): V | undefined;
}

export class PrefixSearchIndex<V> implements SearchIndex<string, V> {
  private root: Map<string, any> = new Map();

  insert(prefix: string, value: V): void {
    let curr = this.root;
    for (const char of prefix) {
      if (!curr.has(char)) {
        curr.set(char, new Map());
      }
      curr = curr.get(char);
    }
    curr.set('__val__', value);
  }

  find(prefix: string): V | undefined {
    let curr = this.root;
    for (const char of prefix) {
      if (!curr.has(char)) return undefined;
      curr = curr.get(char);
    }
    return curr.get('__val__');
  }
}
