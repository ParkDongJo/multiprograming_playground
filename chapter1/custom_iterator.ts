// ES2025 이상을 사용하려면 당자은 ESNext 를 타겟팅해서, 최신 스펙을 반영하도록 해야한다.
// node 버전도 최신 버전을 써야한다. 현재로서는 가장 최신버전 v24 를 써야한다.

function* fibonacci() {
  let current = 1;
  let next = 1;
  while (true) {
    yield current;
    [current, next] = [next, current + next];
  }
}

const seq = fibonacci().map((x) => x ** 2);
console.log(seq.next().value); // 1
console.log(seq.next().value); // 1
console.log(seq.next().value); // 4


const nestedArray = [[1, 2], [3, 4], [5]]
const flattened = nestedArray
  .values()
  .flatMap(arr => arr.map(v => v * 2))
  .toArray()
console.log(flattened)
// [2, 4, 6, 8, 10]

const words = ["hello world", "iterator helpers"]
const result = words
  .values()
  .flatMap(word => word.split(" "))
  .toArray()
console.log(result)
// ["hello", "world", "iterator", "helpers"]
