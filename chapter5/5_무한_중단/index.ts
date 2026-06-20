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
