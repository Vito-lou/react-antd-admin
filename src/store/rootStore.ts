import { TestStore } from './testStore'

export class RootStore {
  testStore: TestStore
  constructor() {
    this.testStore = new TestStore(this)
  }
}

export type TRootStore = RootStore
