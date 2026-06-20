/*
userId 만 들어있는 배열을 가지고, DB에 요청해서 user 데이터를 가져오고, 이메일을 전송하는 파이프라인을 구현해야 합니다.
아래 작업을 순서대로 수행하는 파이프 라인을 만들어주세요.

1. userIds 를 전송
2. 컨트롤러에서 데이터 조회
3. 이메일 전송

조건
- DB 조회는 동시에 3개의 요청까지만 가능합니다.
- 이메일 전송은 동시에 3개까지만 요청해주세요.

사전 준비
fxts/core 라이브러리를 설치해서, 사용하세요.
*/

import { fx, delay } from "@fxts/core";

type User = {
  id: number;
  name: string;
  email: string;
};
class UserController {
  private storeDB: StoreDB;

  constructor(storeDB: StoreDB) {
    this.storeDB = storeDB;
  }

  async getUsers(userIds: number[]) {
    return this.storeDB.readUsers(userIds);
  }

  async sendAuditEmail({ email, name }: Pick<User, 'email' | 'name'>) {
    // console.log(`Sending audit email to ${email} for session ${name}`);
    await delay(1000);
    return { email, name };
  }
}

class StoreDB {
  private users: User[] = [];

  constructor() {
    this.users = [
      { id: 1, name: "John", email: "john@example.com" },
      { id: 2, name: "Jane", email: "jane@example.com" },
      { id: 3, name: "Jim", email: "jim@example.com" },
      { id: 4, name: "Jill", email: "jill@example.com" },
      { id: 5, name: "Jack", email: "jack@example.com" },
      { id: 6, name: "Park", email: "park@example.com" },
      { id: 7, name: "Kim", email: "kim@example.com" },
      { id: 8, name: "Lee", email: "lee@example.com" },
      { id: 9, name: "Choi", email: "choi@example.com" },
      { id: 10, name: "Kwon", email: "kwon@example.com" },
    ];
  }

  async readUsers(userIds: number[]) {
    if (userIds.length > 3) {
      throw new Error('요청 개수 초과');
    }
    // console.log(`SELECT * FROM users WHERE IN ${userIds}`);
    await delay(400);
    return fx(this.users).filter(user => userIds.includes(user.id));
  }
}

const logResult = ({ email, name }: { email: string, name: string }) => {
  console.log('이메일 전송 성공 : ', email, name);
}

const userController = new UserController(new StoreDB());

const run = async (userIds: number[]) => {
  return fx(userIds)
   .chunk(3)
   .toAsync()
   .map(userIds => userController.getUsers(userIds))
   .forEach(users => {
     fx(users)
       .toAsync()
       .map(user => userController.sendAuditEmail({ email: user.email, name: user.name }))
       .concurrent(2)
       .forEach(logResult)
   });
 }

const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log('실행 : ', run(userIds));
