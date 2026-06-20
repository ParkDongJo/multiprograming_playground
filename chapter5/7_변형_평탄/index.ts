/*
map-flat 패턴은 데이터를 변형한(map) 뒤 결과를 평탄화하여(flat) 최종 결과를 얻는 패턴
*/

import { fx } from "../../common/FxIterable";

const comments = [
  {
    id: 1, text: "Hello", replies: [
      { id: 1, text: "Hello" },
      { id: 2, text: "World" },
    ]
  },
  {
    id: 2, text: "World", replies: []
  },
  {
    id: 3, text: "Hello", replies: [
      { id: 1, text: "Hello" },
      { id: 2, text: "World" },
    ]
  }
]

const flattenedArray = fx(comments)
  .map(item => [{ id: item.id, text: item.text }, ...item.replies])
  .flat()
  .forEach(console.log);

console.log(flattenedArray);
