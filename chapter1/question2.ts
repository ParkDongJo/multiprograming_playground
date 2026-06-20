const logs = [
  { id: 1000, price: 100 },
  { id: 2000, price: 101 },
  { id: 3000, price: 100 },
  { id: 4000, price: 102 },
  { id: 5000, price: 103 },
  { id: 6000, price: 105 },
]


function getUpPriceLogs(
  iter: IteratorObject<{ id: number, price: number }>,
  count: number
): number[] {
  let prevPrice: number | null = null

  return iter
    .filter(entry => {
      const isValid = (prevPrice === null || entry.price > prevPrice)
      prevPrice = entry.price
      return isValid
    })
    .map(entry => entry.id)
    .take(count)
    .toArray()
}

/*
price 가 전 price 보다 높은 로그만 찍어야 합니다.
해당되는 id 를 모아서 뱉어냅니다.

로그로 찍으면 아래와 같이 결과가 나와야합니다.

*/
console.log(getUpPriceLogs(logs[Symbol.iterator](), 3))
// [1000, 2000, 4000]


