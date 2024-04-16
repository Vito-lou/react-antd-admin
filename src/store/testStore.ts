import { makeObservable } from 'mobx'
import type { TRootStore } from './rootStore'

export class TestStore {
  rootStore: TRootStore
  constructor(rootStore: TRootStore) {
    this.rootStore = rootStore
    makeObservable(this)
  }
}
