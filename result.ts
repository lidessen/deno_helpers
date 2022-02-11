export class None {}

export function isNone(val: unknown): val is None {
  return val instanceof None;
}

export type Result<T> = T | None;

export function isSome<T>(val: T | None): val is T {
  return !isNone(val);
}
