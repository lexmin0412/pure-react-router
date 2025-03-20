import { useContext } from "react"
import { matchRoute } from "../utils"
import useHistory from "./use-history"
import { PureRouterContext } from "."

/**
 * 匹配当前页面路径的路由对象
 */
export const useMatchRoute = () => {
	const history = useHistory()
	const { routes } = useContext(PureRouterContext)
	return matchRoute(history.location.pathname, routes)
}
