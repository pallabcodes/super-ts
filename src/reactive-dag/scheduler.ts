import { ReactiveNode } from './node.js';
import { ReactiveDAG } from './graph.js';

export class ReactiveScheduler {
  private dag = new ReactiveDAG();
  private batchQueue = new Set<ReactiveNode<any>>();
  private isFlushing = false;

  scheduleUpdate(node: ReactiveNode<any>): void {
    this.batchQueue.add(node);
    if (!this.isFlushing) {
      Promise.resolve().then(() => this.flush());
    }
  }

  flush(): void {
    if (this.isFlushing || this.batchQueue.size === 0) return;
    this.isFlushing = true;

    try {
      const nodesToPropagate = Array.from(this.batchQueue);
      this.batchQueue.clear();

      const evalOrder = this.dag.getTopologicalOrder(nodesToPropagate);
      for (const node of evalOrder) {
        // Evaluate batched nodes top-down
      }
    } finally {
      this.isFlushing = false;
    }
  }
}
