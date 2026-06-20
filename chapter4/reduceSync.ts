function reduceSync<A, Acc>(
  fn: (acc: Acc, a: A) => Acc,
  acc: Acc,
  iterable: Iterable<A>
): Acc {
  for (const a of iterable) {
    acc = fn(acc, a);
  }
  return acc;
}
