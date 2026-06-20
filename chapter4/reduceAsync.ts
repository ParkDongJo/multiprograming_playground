export async function reduceAsync<A, Acc>(
  fn: (acc: Acc, a: A) => Acc | Promise<Acc>,
  acc: Acc,
  asyncIterable: AsyncIterable<A>
): Promise<Acc> {
  for await (const a of asyncIterable) {
    acc = await fn(acc, a);
  }
  return acc;
}
