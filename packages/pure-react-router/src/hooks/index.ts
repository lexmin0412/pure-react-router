import React from "react";
import { IRoute } from "../types";

export { default as useHistory } from "./use-history";
export { default as useParams } from "./use-params";
export { default as useSearchParams } from "./use-search-params";
export { useMatchRoute } from "./use-match-route";

/**
 * 路由上下文
 */
export const PureRouterContext = React.createContext<{
  basename: string;
  routes: IRoute[];
}>({
  basename: "",
  routes: [],
});
