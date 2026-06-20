import { filter, pipe, take } from "@fxts/core";

export const find = <A>(fn: (a: A) => boolean, iterable: Iterable<A>) =>
  pipe(
    iterable,
    filter(fn),
    take(1),
    ([...arr]) => arr[0],
  );