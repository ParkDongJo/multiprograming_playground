/*
Looking at the error, TypeScript can't access Symbol.iterator on the unknown type. The most concise fix is to cast iterable to any before accessing the symbol property:

이 방법은 다음과 같은 단계로 체크합니다:
iterable != null - null이나 undefined가 아닌지 확인
typeof iterable === 'object' - 객체 타입인지 확인
Symbol.iterator in iterable - Symbol.iterator 프로퍼티가 존재하는지 확인
*/
export const isIterable = <T = unknown>(iterable: Iterable<T> | unknown): iterable is Iterable<T> => {
  return iterable != null && typeof iterable === 'object' && Symbol.iterator in iterable;
}
