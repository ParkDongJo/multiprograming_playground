export default function compose<A, B, C>(
  f: (a: A) => B,
  g: (b: B) => C,
): (a: A) => C {
  return (a: A) => g(f(a));
}
