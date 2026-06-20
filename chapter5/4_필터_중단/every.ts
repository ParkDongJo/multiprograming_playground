import { pipe , reject, take } from "@fxts/core";

export const every = <A>(fn: (a: A) => boolean, iterable: Iterable<A>) =>
   pipe(
    iterable,
    reject(fn),
    take(1),
    ([...arr]) => arr.length === 0,
  );
  