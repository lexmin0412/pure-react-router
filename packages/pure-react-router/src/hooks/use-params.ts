import { useContext } from "react";
import { PureRouterContext } from "../hooks";
import useHistory from "./use-history";
import { matchRoute } from "../utils";

/**
 * 获取 path 参数
 */
const useParams = <T extends Record<string, string> = {}>(): T => {
  const { routes } = useContext(PureRouterContext)
  const { location: { pathname } } = useHistory()
  const matchedRoute = matchRoute(pathname, routes)

  if (!matchedRoute) {
    return {} as T
  }
  return (matchedRoute?.params || {}) as T
};

export default useParams
