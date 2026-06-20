import { fx } from "@fxts/core";

fx([1, 2, 3, 0, 0, 0, 0])
.takeWhile(x => {
  console.log('takeWhile : ',x);
  return x >= 1;
})
.forEach(console.log);

/*
takeWhile :  1
1
takeWhile :  2
2
takeWhile :  3
3
takeWhile :  0
0
*/