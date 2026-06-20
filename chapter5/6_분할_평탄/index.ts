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
