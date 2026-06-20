const pageSize = 5
const arr = Array.from(
  { length: 5_000_000 },
  (_, i) => ({ isVisible: i % 3 !== 0, index: i })
)

const getPageData = (iter: IteratorObject<{ isVisible: boolean, index: number }>, offset = -1) =>
  iter
    .drop(offset + 1)
    .filter(v => v.isVisible)
    .take(pageSize)
    .map(v => v.index)
    .toArray()

console.log(getPageData(arr[Symbol.iterator]()))
// [1, 2, 4, 5, 7]
console.log(getPageData(Iterator.from(arr), 7))
// [8, 10, 11, 13, 14]
console.log(getPageData(arr.values(), 14))
// [16, 17, 19, 20, 22]

