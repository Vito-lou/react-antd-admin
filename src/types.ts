export type TUser = {
  username: string;
  password: string;
  remember?: string;
};

export interface IUserInfo {
  name?: string;
}

export interface IMenu {
  id: string;
  path: string;
  auth?: boolean;
  title?: string;
  pageKey: string; //组件页面标识key
  iconClass?: string;
  element: any;
  hidden?: boolean;
  parentId: string;
}

export interface IUserData {
  userInfo: IUserInfo;
  menuList: IMenu[];
}

export interface IRouterMap {
  path: string;
  auth: boolean;
  title: string;
  key: string;
  iconClass?: string;
  element: any;
  hidden?: boolean;
  children?: IChilRouterMap[];
}

export interface IChilRouterMap extends IRouterMap {
  parentPath: string;
}
