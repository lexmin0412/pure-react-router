import { IRoute } from "../types";

// 定义路由匹配函数
export const matchRoute = (pathname: string, routes: IRoute[]) => {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const routePath = route.path;
    const routeRegex = routePath
      .replace(/\//g, "\\/")
      .replace(/:\w+/g, "([^/]+)");
    const regex = new RegExp(`^${routeRegex}`);

    const routeParamKeys = routePath.split("/").filter((part) => part.startsWith(":")).map((part) => part.slice(1));
    const routeParamValues = pathname?.match(regex)?.slice(1)

    const tempParams: Record<string, string> = {}
    routeParamKeys.forEach((key, index)=>{
      tempParams[key] = routeParamValues?.[index]!;
    })

    if (regex.test(pathname)) {
      return {
        route,
        params: tempParams,
      };
    }
  }
  return null;
};
