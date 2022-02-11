import { None, Result } from "./result.ts";

export function asyncSingleton<T>(
  fn: () => Promise<T>,
): [() => Promise<T>, () => Result<T>] {
  let val: Result<T> = new None();
  const promise = Promise.resolve(
    fn().then((res) => {
      val = res;
      return res;
    }),
  );
  return [() => promise, () => val];
}
