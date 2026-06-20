import { isIterable } from "./isIterable";
import { filterSync } from "./filterSync";
import { filterAsync } from "./filterAsync";

export function filter<A>(
  f: (a: A) => boolean,
  iterable: Iterable<A>
): IterableIterator<A>;
export function filter<A>(
  f: (a: A) => boolean | Promise<boolean>,
  asyncIterable: AsyncIterable<A>
): AsyncIterableIterator<A>;
export function filter<A>(
  f: (a: A) => boolean | Promise<boolean>,
  iterable: Iterable<A> | AsyncIterable<A>
): IterableIterator<A> | AsyncIterableIterator<A> {
  return isIterable(iterable) ? 
    filterSync(f as (a: A) => boolean, iterable) : 
    filterAsync(f, iterable);
}