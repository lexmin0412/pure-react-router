import { LazyExoticComponent } from "react";

/**
 * 静态组件
 */
type IStaticComponent = () => JSX.Element
/**
 * 懒加载组件
 */
type ILazyComponent = LazyExoticComponent<() => JSX.Element>

/**
 * 路由配置 Item
 */
export interface IRoute {
	/**
	 * 路径
	 */
  path: string;
	/**
	 * 组件
	 */
  component: IStaticComponent | ILazyComponent | null;
	/**
	 * 重定向路由 path
	 */
	redirect?: string;
}
