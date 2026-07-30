export type CleanFn = () => void;

export class ReactiveNode<T> {
  private value: T;
  private dependents = new Set<ReactiveNode<any>>();
  private dependencies = new Set<ReactiveNode<any>>();

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  get(): T {
    return this.value;
  }

  set(newValue: T): void {
    if (this.value !== newValue) {
      this.value = newValue;
      this.notifyDependents();
    }
  }

  addDependency(node: ReactiveNode<any>): void {
    this.dependencies.add(node);
    node.dependents.add(this);
  }

  removeDependency(node: ReactiveNode<any>): void {
    this.dependencies.delete(node);
    node.dependents.delete(this);
  }

  getDependents(): Set<ReactiveNode<any>> {
    return this.dependents;
  }

  getDependencies(): Set<ReactiveNode<any>> {
    return this.dependencies;
  }

  private notifyDependents(): void {
    // Topological evaluation propagation
    for (const dependent of this.dependents) {
      dependent.onDependencyChanged(this);
    }
  }

  protected onDependencyChanged(_source: ReactiveNode<any>): void {
    // Override in computed/derived nodes
  }
}

export class DerivedNode<T> extends ReactiveNode<T> {
  private computeFn: () => T;

  constructor(computeFn: () => T, dependencies: ReactiveNode<any>[] = []) {
    super(computeFn());
    this.computeFn = computeFn;
    for (const dep of dependencies) {
      this.addDependency(dep);
    }
  }

  protected override onDependencyChanged(_source: ReactiveNode<any>): void {
    const newValue = this.computeFn();
    this.set(newValue);
  }
}
