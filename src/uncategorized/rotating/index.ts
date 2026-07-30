/**
 * Capability: Rotating
 * Circular shifts, index wraps, dynamic rotation operations.
 */
export class Rotator<T> {
  static rotateLeft<T>(items: T[], positions: number): T[] {
    if (items.length === 0) return [];
    const k = positions % items.length;
    return items.slice(k).concat(items.slice(0, k));
  }

  static rotateRight<T>(items: T[], positions: number): T[] {
    if (items.length === 0) return [];
    const k = positions % items.length;
    return items.slice(-k).concat(items.slice(0, -k));
  }
}
