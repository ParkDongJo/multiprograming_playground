import { isIterable } from "./isIterable";
import { mapSync } from "./mapSync";
import { mapAsync } from "./mapAsync";

export function map<A, B>(
  f: (a: A) => B,
  iterable: Iterable<A>
): IterableIterator<B>;
export function map<A, B>(
  f: (a: A) => B,
  asyncIterable: AsyncIterable<A>
): AsyncIterableIterator<Awaited<B>>;
export function map<A, B>(
  f: (a: A) => B,
  iterable: Iterable<A> | AsyncIterable<A>
): IterableIterator<B> | AsyncIterableIterator<Awaited<B>> {
  return isIterable(iterable) ? 
    mapSync(f, iterable) : 
    mapAsync(f, iterable);
}
