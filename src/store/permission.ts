import { makeAutoObservable } from "mobx";
import { login, logout, getInfo } from "@/api/user";
import type { TRootStore } from "./rootStore";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { TUser } from "../types";

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some((role) => route.meta.roles.includes(role));
//   } else {
//     return true;
//   }
// }
function MenuToRoutes(menuList) {
  return [];
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// export function filterAsyncRoutes(routes, roles) {
//   const res = [];

//   routes.forEach((route) => {
//     const tmp = { ...route };
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRoutes(tmp.children, roles);
//       }
//       res.push(tmp);
//     }
//   });

//   return res;
// }

class PermissionStore {
  rootStore: TRootStore;
  routes = [];
  constructor(rootStore: TRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
  setRoutes(routes) {
    this.routes = routes;
  }

  // 生成路由
  generateRoutes(menuList) {
    return new Promise((resolve) => {
      const accessedRoutes = MenuToRoutes(menuList);
      this.setRoutes(accessedRoutes);
      resolve(accessedRoutes);
    });
  }
}

export default PermissionStore;
