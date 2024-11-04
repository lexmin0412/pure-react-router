import React from 'react'
import { IRoute } from "../types";
import { PureRouterContext } from "../hooks";

interface IBrowserRouterProps {
  basename: string
  routes: IRoute[];
  children: React.ReactNode;
}

/**
 * 路由容器, 提供路由信息
 */
const BrowserRouter = (props: IBrowserRouterProps) => {
  const { basename, routes, children } = props;

  return (
    <PureRouterContext.Provider value={{ routes, basename }}>
      {children}
    </PureRouterContext.Provider>
  )
};

export default BrowserRouter;
