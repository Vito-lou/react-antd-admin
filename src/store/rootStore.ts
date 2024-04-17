import { TestStore } from "./testStore";
import UserStore from "./user";
export class RootStore {
  testStore: TestStore;
  userStore: UserStore;
  constructor() {
    this.testStore = new TestStore(this);
    this.userStore = new UserStore(this);
  }
}

export type TRootStore = RootStore;
