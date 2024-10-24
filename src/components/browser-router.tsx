import useHistory from "../hooks/use-history";
import { matchRoute } from "../utils/match-route";
import { IRoute } from "../types";
import { PureRouterContext } from "../hooks";

interface IBrowserRouterProps {
  routes: IRoute[];
}

const BrowserRouter = (props: IBrowserRouterProps) => {
  const { routes } = props;
  const history = useHistory();
  const RouteComponent = matchRoute(history.location.pathname, routes)?.route
    ?.component;

  return RouteComponent ? (
    <PureRouterContext.Provider value={{ routes }}>
      <RouteComponent />
    </PureRouterContext.Provider>
  ) : (
    <></>
  );
};

export default BrowserRouter;
