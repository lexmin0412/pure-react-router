import React from 'react'
import { IRoute } from "../types";
import { PureRouterContext } from "../hooks";

interface IBrowserRouterProps {
	/**
	 * 路由前缀
	 */
  basename: string
  /**
   * 路由列表
   */
  routes: IRoute[];
  /**
   * 子组件 需要嵌套 <Route />
   */
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
