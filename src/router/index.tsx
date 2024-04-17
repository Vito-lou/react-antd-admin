import React, { lazy, Suspense, ComponentType, LazyExoticComponent } from "react";
import {
  Navigate,
  RouteObject,
  createBrowserRouter,
  RouterProvider,
  useRoutes,
} from "react-router-dom";
import { CircleLoading } from "@/components/loading";
import Layout from "antd/es/layout/layout";
import { About, Home } from "../components";

const lazyLoad = (Component: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<CircleLoading />}>
    <Component />
  </Suspense>
)


const Page403 = lazy(() => import('@/pages/error/403'));
const Page404 = lazy(() => import('@/pages/error/404'));
const Page500 = lazy(() => import('@/pages/error/500'));


export const constantRoutes: RouteObject[] = [
  // {
  //   path: "/login",
  //   element: <Navigate to="/login" />
  // },
  {
    path: "/login",
    Component: lazy(() => import("@/pages/login")),
  },
  {
    path: "/",
    element: <Home />,
  },
  // {
  //   path: "500",
  //   element: lazyLoad(Page500)
  // },
  // {
  //   path: "403",
  //   element: lazyLoad(Page403)
  // },
  {
    path: '*',
    element: lazyLoad(Page404),
  }
]
const Router = () => {
  const routes = useRoutes(constantRoutes)
  return routes
}

export default Router
