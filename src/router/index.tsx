import React, { lazy } from "react";
import {
  Navigate,
  RouteObject,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { About, Home } from "../components";
const LoginRoute: RouteObject = {
  path: "/login",
  Component: lazy(() => import("@/pages/login")),
};

const PAGE_NOT_FOUND_ROUTE: RouteObject = {
  path: '*',
  element: <Navigate to="/404" replace />,
};

const HomeComponent: RouteObject = {
  path: "/",
  element: <Home />,
};
// const Error404: RouteObject = {
//   path: "*",
//   element: <Navigate to="/404" />,
// };
export default function Router() {
  const routes = [LoginRoute, HomeComponent, PAGE_NOT_FOUND_ROUTE];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
