import { fx } from "../common/FxIterable";

export function some<A>(iterable: Iterable<A>, fn: (a: A) => boolean): boolean {
  return fx(iterable).map(fn).reduce((acc, a) => acc || a, false);
}
