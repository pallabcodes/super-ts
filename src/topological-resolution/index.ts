/**
 * Topological Resolution Subsystem
 * Focus: Dependency graph analysis, resolution, cycle detection, entity grouping.
 */

export class DependencyGraphResolver<T extends string> {
  private adjacencyList = new Map<T, Set<T>>();

  addDependency(node: T, dependsOn: T): void {
    if (!this.adjacencyList.has(node)) {
      this.adjacencyList.set(node, new Set());
    }
    if (!this.adjacencyList.has(dependsOn)) {
      this.adjacencyList.set(dependsOn, new Set());
    }
    this.adjacencyList.get(node)!.add(dependsOn);
  }

  resolveExecutionOrder(): T[] {
    const visited = new Set<T>();
    const temp = new Set<T>();
    const order: T[] = [];

    const visit = (node: T) => {
      if (temp.has(node)) {
        throw new Error(`Circular dependency detected at node: ${String(node)}`);
      }
      if (!visited.has(node)) {
        temp.add(node);
        const deps = this.adjacencyList.get(node) || new Set();
        for (const dep of deps) {
          visit(dep);
        }
        visited.add(node);
        temp.delete(node);
        order.push(node);
      }
    };

    for (const node of this.adjacencyList.keys()) {
      if (!visited.has(node)) {
        visit(node);
      }
    }

    return order;
  }
}
