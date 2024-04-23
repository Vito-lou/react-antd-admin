import React from "react";
import { makeAutoObservable } from "mobx";
import type { TRootStore } from "./rootStore";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { TUser, IUserInfo, IMenu, IUserData } from "../types";
import type { MenuProps } from "antd";
import { RouteObject } from "react-router-dom";
import * as Icon from "@ant-design/icons";
type MenuItem = Required<MenuProps>["items"][number];

const generateMenus = (menuList: IMenu[], parentId = "0") => {
  return menuList
    .filter((item) => item.parentId === parentId && !item.hidden)
    .map((item) => {
      const childMenus: MenuItem[] = generateMenus(menuList, item.id);
      console.log("child", childMenus);
      const menuItem: MenuItem = {
        key: item.id,
        label: item.title,
        // icon: item.iconClass ? React.createElement(item.iconClass) : ''
      };

      if (childMenus.length > 0) {
        menuItem.children = childMenus;
      }
      return menuItem;
    });
};
class MenuStore {
  rootStore: TRootStore;
  token = getToken();
  userInfo: IUserInfo = {};
  menuItems: MenuItem[] = [];
  constructor(rootStore: TRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setMenuItems(menuItems: MenuItem[]) {
    this.menuItems = menuItems;
  }

  routesToMenus(menuList: IMenu[]) {
    const menuItems: MenuItem[] = generateMenus(menuList);
    this.setMenuItems(menuItems);
    console.log(this.menuItems);
  }
}

export default MenuStore;
