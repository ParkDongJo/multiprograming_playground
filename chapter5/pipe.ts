/*
nested-map 패턴은 리스트 프로세싱에서 중첩된 데이터 구조를 처리하거나 데이터의 계층을 따라 각 수준에서 변형을 수행할때
*/

import { fx } from "@fxts/core";

const tree = [
  { id: 1, children: [{ id: 2 }, { id: 3 }] },
  { id: 4, children: [{ id: 5 }, { id: 6 }] },
];

const transformedTree = fx(tree)
  .map(node => ({
     ...node, 
     children: node.children.map(child => ({ ...child, parentId: node.id })) }))
  .toArray();

console.log(transformedTree);



/*
Iterator-forEach 패턴은 리스트 프로세싱에서 이터레이터를 만들어둔 후 지연 평가를 통해 데이터를 소비하며 부수적인 효과(forEach)
를 발생시키는 패턴이다.
*/

import { pipe, flat, range, chunk, toArray, map, join } from "@fxts/core";

const getMonthEndDate = (monthEnd: Date) => {
  return monthEnd.getDate() === 6
    ? []
    : range(
      monthEnd.getDate() - monthEnd.getDay(),
      monthEnd.getDate() + 1,
    )
}

const generateCalendar = (prevMonthEnd: Date, currentMonthEnd: Date) => {
  return pipe(
    flat([
      getMonthEndDate(prevMonthEnd),
      range(1, currentMonthEnd.getDate() + 1),
      range(1, 6 - currentMonthEnd.getDay() + 1),
    ]),
    chunk(7),
    toArray,
  )
}

const formatCalendar = (calendar: number[][]) => {
  return pipe(
    calendar,
    map(map(day => (day < 10 ? ` ${day}` : day))),
    map(join(" ")),
    join("\n"),
  )
}

const renderCalendar = (year: number, month: number) => {
  pipe(
    generateCalendar(new Date(year, month - 1, 0), new Date(year, month, 0)),
    formatCalendar,
    console.log,
  )
}

renderCalendar(2025, 6);


/*
range-take 패턴은 끝이 없는 데이터 스트림에서 필요한 만큼만 데이터를 추출하기 위한 패턴

*/

import { fx } from "@fxts/core";
import { range } from "./range";

const getPayments = async (page: number) => {
  return await fetch(`https://api.example.com/payments?page=${page}`).then(res => res.json());
};

const run = async () => {
  const payments = await fx(range(1, Infinity))
    .toAsync()
    .map(page => getPayments(page))
    .takeUntilInclusive(payments => payments.length === 0)
    .flat()
    .toArray();
  console.log(payments);
};

run();


import { fx } from "@fxts/core";

/*
 chunk-flat 패턴은 데이터를 일정 크기로 분할한 뒤 다시 평탄화(flat)하여 원하는 형태로 변환
*/

type Order = {
  id: number;
  amount: number;
  status: string;
};

class StoreDB {
  private orders: Order[] = [];

  async getOrders(ids: number[]) {
    return []
  }
}

const storeDB = new StoreDB();

const payments = [
  { id: 1, amount: 100 },
  { id: 2, amount: 200 },
  { id: 3, amount: 300 },
  { id: 4, amount: 400 },
  { id: 5, amount: 500 },
];

const run = async () => {
  const orders = await fx(payments)
    .map(payment => payment.id)
    .chunk(10)
    .toAsync()
    .map(storeDB.getOrders)
    .flat()
    .toArray();
};

run();


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


import { zip } from "./zip";
import { fx } from "../../common/FxIterable";

/*
zip-reduce 패턴은 두 배열 이터러블을 결합한 후 이를 순회하여 최종결과 누적
*/

const keys = ['name', 'age', 'city'];
const values = ['John', 30, 'New York'];

const object = fx(zip(keys, values))
  .map(([key, value]) => ({ [key]: value }))
  .reduce((acc, curr) => ({ ...acc, ...curr }), {});

console.log(object);


import { indexBy } from "./indexBy";
import { groupBy } from "./groupBy";

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Jim" },
];

const posts = [
  { id: 1, title: "Hello", userId: 1 },
  { id: 2, title: "World", userId: 2 },
  { id: 3, title: "Hello", userId: 3 },
];


const userById = indexBy(user => user.id, users);

const postWithUsers = posts.map(post => ({
  ...post,
  user: userById[post.userId],
}));

console.log(postWithUsers);


const comments = [
  { id: 1, text: "Hello", postId: 1 },
  { id: 2, text: "World", postId: 2 },
  { id: 3, text: "Hello", postId: 3 },
];

const commentByPostId = groupBy(comment => comment.postId, comments);

const postWithComments = posts.map(post => ({
  ...post,
  comments: commentByPostId[post.id] || [],
}));

console.log(postWithComments);