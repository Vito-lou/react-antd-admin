import { makeAutoObservable } from "mobx";
import { login, logout, getInfo } from "@/api/user";
import type { TRootStore } from "./rootStore";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { TUser } from "../types";

type TRoles = String[];
class UserStore {
  rootStore: TRootStore;
  token = getToken();
  userInfo: {};
  menuList: [];
  constructor(rootStore: TRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setToken(token: string) {
    this.token = token;
    setToken(token);
  }

  setUserInfo(userInfo) {
    this.userInfo = userInfo;
  }

  setMenuList(menuList) {
    this.menuList = menuList;
  }

  login(userInfo: TUser): Promise<void> {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          this.setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getInfo() {
    return new Promise((resolve, reject) => {
      getInfo(this.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again.");
          }
          console.log("what data", data);
          const { userInfo, menuList } = data;
          this.setUserInfo(userInfo);
          this.setMenuList(menuList);
          resolve(menuList);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          this.setToken("");
          removeToken();
          // resetRouter();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  resetToken(): Promise<void> {
    return new Promise((resolve) => {
      this.setToken("");
      removeToken();
      resolve();
    });
  }
}

export default UserStore;
