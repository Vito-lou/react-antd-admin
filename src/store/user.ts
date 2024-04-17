import { makeAutoObservable } from "mobx";
import { login, logout, getInfo } from "@/api/user";
import type { TRootStore } from "./rootStore";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { TUser } from "../types";

type TRoles = String[];
class UserStore {
  rootStore: TRootStore;
  token = getToken();
  name = "";
  avatar = "";
  introduction = "";
  roles: TRoles = [];
  constructor(rootStore: TRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setToken(token: string) {
    this.token = token;
    setToken(token);
  }

  setIntroduction(introduction: string) {
    this.introduction = introduction;
  }

  setName(name: string) {
    this.name = name;
  }

  setAvatar(avatar: string) {
    this.avatar = avatar;
  }

  setRoles(roles: TRoles) {
    this.roles = roles;
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

          const { roles, name, avatar, introduction } = data;

          if (!roles || roles.length <= 0) {
            reject("getInfo: roles must be a non-null array!");
          }

          this.setRoles(roles);
          this.setName(name);
          this.setAvatar(avatar);
          this.setIntroduction(introduction);
          resolve(data);
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
          this.setRoles([]);
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
      this.setRoles([]);
      removeToken();
      resolve();
    });
  }
}

export default UserStore;