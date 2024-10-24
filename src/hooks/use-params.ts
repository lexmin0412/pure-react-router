import { useContext } from "react";
import { PureRouterContext } from "../hooks";
import useHistory from "./use-history";
import { matchRoute } from "../utils";

const useParams = () => {

  const { routes } = useContext(PureRouterContext)
  const { location: { pathname } } = useHistory()
  const matchedRoute = matchRoute(pathname, routes)

  if (!matchedRoute) {
    return {}
  }
  return matchedRoute?.params
};

export default useParams