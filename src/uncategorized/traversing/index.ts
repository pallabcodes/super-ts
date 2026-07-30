/**
 * Capability: Traversing
 * Abstract iteration, step-walking, depth/breadth visitor patterns.
 */
export type Visitor<T> = (item: T) => boolean | void;

export class Traverser {
  static depthFirst<T>(
    root: T,
    getChildren: (node: T) => T[],
    visit: Visitor<T>
  ): void {
    const stack: T[] = [root];
    const visited = new Set<T>();

    while (stack.length > 0) {
      const curr = stack.pop()!;
      if (!visited.has(curr)) {
        visited.add(curr);
        const shouldStop = visit(curr);
        if (shouldStop === true) break;
        const children = getChildren(curr);
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push(children[i]);
        }
      }
    }
  }

  static breadthFirst<T>(
    root: T,
    getChildren: (node: T) => T[],
    visit: Visitor<T>
  ): void {
    const queue: T[] = [root];
    const visited = new Set<T>();

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (!visited.has(curr)) {
        visited.add(curr);
        const shouldStop = visit(curr);
        if (shouldStop === true) break;
        const children = getChildren(curr);
        for (const child of children) {
          queue.push(child);
        }
      }
    }
  }
}
