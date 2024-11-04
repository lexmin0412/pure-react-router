import { useContext } from 'react'

import { PureRouterContext, useHistory } from '../hooks'
import { matchRoute } from '../utils'

/**
 * 路由组件，匹配路由展示页面
 */
export default function Route() {
	const history = useHistory()
	const { routes } = useContext(PureRouterContext)
	const RouteComponent = matchRoute(history.location.pathname, routes)?.route?.component

	return RouteComponent ? <RouteComponent /> : <></>
}
