/**
 * Stream Processing Subsystem
 * Focus: Sliding window aggregations, sorting pipelines, stream transformations.
 */

export class SlidingWindowAggregator {
  private window: number[] = [];

  constructor(public readonly windowSize: number) {}

  add(value: number): number {
    this.window.push(value);
    if (this.window.length > this.windowSize) {
      this.window.shift();
    }
    return this.average();
  }

  average(): number {
    if (this.window.length === 0) return 0;
    const sum = this.window.reduce((acc, curr) => acc + curr, 0);
    return sum / this.window.length;
  }
}
