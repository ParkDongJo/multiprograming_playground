import { isIterable } from "./isIterable";
import { reduceAsync } from "./reduceAsync";
import { reduceSync } from "./reduceSync";

export function reduce<A, Acc>(
  fn: (acc: Acc, a: A) => Acc,
  acc: Acc,
  iterable: Iterable<A>
): Acc;
export function reduce<A, Acc>(
  fn: (acc: Acc, a: A) => Acc | Promise<Acc>,
  acc: Acc,
  asyncIterable: AsyncIterable<A>
): Promise<Acc>;
export function reduce<A, Acc>(
  fn: (a: Acc | A, b: A) => Acc,
  acc: Acc,
  iterable: Iterable<A> | AsyncIterable<A>
): Acc | Promise<Acc> {
  return isIterable(iterable) ? 
    reduceSync(fn, acc, iterable) : 
    reduceAsync(fn, acc, iterable);
}
