import { useContext, useMemo } from 'react'

import { PureRouterContext, useHistory } from '../hooks'
import { matchRoute } from '../utils'

/**
 * 路由组件，匹配路由展示页面
 */
export default function Route() {
	const history = useHistory()
	const { routes } = useContext(PureRouterContext)

	const matchedRoute = useMemo(()=>{
		return matchRoute(history.location.pathname, routes)?.route
	}, [history.location.pathname, routes])

	if (matchedRoute?.component) {
		const RouteComponent = matchedRoute.component
		return <RouteComponent />
	}

	if (matchedRoute?.redirect) {
		history.push(matchedRoute.redirect)
	}

	return <></>
}
