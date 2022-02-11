import { isSome, None, Result } from "./result.ts";

export function delayed<T>(): [
  () => Promise<T>,
  (value: T) => void,
  () => T | None,
] {
  let current: Result<T> = new None();
  const resolve = (val: T) => {
    current = val;
    while (pendings.length > 0) {
      const rev = pendings.shift()!;
      rev(val);
    }
  };
  const pendings: ((val: T) => void)[] = [];
  const get = () => {
    if (isSome(current)) {
      return Promise.resolve<T>(current);
    }
    return new Promise<T>((rev) => {
      pendings.push(rev);
    });
  };
  return [get, resolve, () => current];
}
