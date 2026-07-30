import { ReactiveNode } from './node.js';

export class ReactiveDAG {
  private nodes = new Set<ReactiveNode<any>>();

  registerNode<T>(node: ReactiveNode<T>): ReactiveNode<T> {
    this.nodes.add(node);
    return node;
  }

  /**
   * Topological sorting to obtain evaluation order without cyclic deadlocks
   */
  getTopologicalOrder(startNodes: ReactiveNode<any>[]): ReactiveNode<any>[] {
    const visited = new Set<ReactiveNode<any>>();
    const temp = new Set<ReactiveNode<any>>();
    const order: ReactiveNode<any>[] = [];

    const visit = (node: ReactiveNode<any>) => {
      if (temp.has(node)) {
        throw new Error('Cycle detected in Reactive DAG during propagation evaluation');
      }
      if (!visited.has(node)) {
        temp.add(node);
        for (const dep of node.getDependents()) {
          visit(dep);
        }
        visited.add(node);
        temp.delete(node);
        order.push(node);
      }
    };

    for (const node of startNodes) {
      if (!visited.has(node)) {
        visit(node);
      }
    }

    return order.reverse();
  }
}
