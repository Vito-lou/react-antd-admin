import React, { lazy } from "react";
import {
  Navigate,
  RouteObject,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorRoutes } from "./errorRoutes";
import Layout from "antd/es/layout/layout";
import { About, Home } from "../components";
import AuthGuard from "./authGuard";
import { usePermissionRoutes } from "@/hooks";
const LoginRoute: RouteObject = {
  path: "/login",
  Component: lazy(() => import("@/pages/login")),
};

const PAGE_NOT_FOUND_ROUTE: RouteObject = {
  path: '*',
  element: <Navigate to="/404" replace />,
};

// const HomeComponent: RouteObject = {
//   path: "/",
//   element: <Home />,
// };


export default function Router() {
  const permissionRoutes = usePermissionRoutes();
  const asyncRoutes: RouteObject = {
    path: '/',
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [{ index: true, element: <Navigate to={'/'} replace /> }, ...permissionRoutes],
  };
  const routes = [LoginRoute, asyncRoutes, ErrorRoutes, PAGE_NOT_FOUND_ROUTE];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
