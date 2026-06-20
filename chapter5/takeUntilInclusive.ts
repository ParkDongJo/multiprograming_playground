import { fx } from "@fxts/core";

fx([0, 10, 1, 3, 5, 0, 4, 2])
.takeUntilInclusive(x => {
  console.log('takeUntilInclusive : ',x);
  return x === 5;
})
.forEach(console.log);

/*
takeUntilInclusive :  0
0
takeUntilInclusive :  10
10
takeUntilInclusive :  1
1
takeUntilInclusive :  3
3
takeUntilInclusive :  5
5
*/
