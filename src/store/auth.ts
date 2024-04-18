import { makeAutoObservable } from "mobx";
import { TRootStore } from "./rootStore";

class AuthStore {
  loading: Boolean;
  rootStore: TRootStore;
  constructor(rootStore: TRootStore) {
    this.rootStore = rootStore;
    // this.loading = true;
    this.setLoading(true);
    makeAutoObservable(this);
  }
  setLoading(loading: boolean) {
    this.loading = loading;
  }
  async authenticate() {
    // this.setLoading(true);
    try {
      if (this.rootStore.userStore.token) {
        if (!this.rootStore.userStore?.menuList?.length) {
          const { menuList } = await this.rootStore.userStore.getInfo();
          console.log("what get menu", menuList);
          await this.rootStore.permissionStore.generateRoutes(menuList);
        }
      }
    } catch (error) {
      await this.rootStore.userStore.resetToken();
      throw error;
    } finally {
      // debugger;
      this.setLoading(false);
    }
  }
}

export default AuthStore;
