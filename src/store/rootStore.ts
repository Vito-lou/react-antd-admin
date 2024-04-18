import { TestStore } from "./testStore";
import UserStore from "./user";
import PermissionStore from "./permission";
import AuthStore from "./auth";
export class RootStore {
  testStore: TestStore;
  userStore: UserStore;
  permissionStore: PermissionStore;
  authStore: AuthStore;
  constructor() {
    this.testStore = new TestStore(this);
    this.userStore = new UserStore(this);
    this.permissionStore = new PermissionStore(this);
    this.authStore = new AuthStore(this);
  }
}

export type TRootStore = RootStore;
