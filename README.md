# Pure React Router（WIP）

一个干净的 React Router 实现，API 参考了 React Router 但大幅简化。

## API

### 组件

#### BrowserRouter

路由容器。只需简单传入扁平的 routes 配置即可，无需繁琐的 Switch/Router/Route 嵌套。

场景应用：在应用入口文件中定义路由结构。

```tsx
const RouteList = [
  { path: "/test1", component: Test1 },
  { path: "/test2", component: Test2 },
  { path: "/test3/:id", component: Test3 },
  { path: "/test4", component: Test4 },
];

const App = () => {
	return (
		<BrowserRouter routes={RouteList} />
	);
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
```

#### Link

跳转组件，用于替换 a 标签。

场景应用：跳转到其他路由。

```tsx
export default function App() {
	return <Link to="/test1">test1</Link>
}
```

### Hooks

#### useHistory

获取 history 对象。

场景应用：监听 pathname 变更修改页面标题。

```tsx
import { useHistory } from 'pure-react-router'
import pkgJson from '../package.json'

export default function App() {

	const history = useHistory()

	useEffect(() => {
		if (history.location.pathname.includes('detail')) {
			document.title = `详情`
		}
		document.title = pkgJson.name
	}, [history.location.pathname])

	return (
		<div>Content</div>
	)
}
```

#### useParams

获取 URL 中的 Path 参数。

场景应用：获取 Path 中的 id 查询详情。

示例：路由定义为 `/detail/:id`, 页面实际路径为 `/detail/123`，则 `useParams()` 的返回结果为 `{id: '123'}`

```tsx
import { useState } from 'react'
import { useParams } from "pure-react-router";

export default function App() {

	const params = useParams()
	const [detail, setDetail] = useState()

	const getDetail = async(id: string) => {
		const result = await promise()
		setDetail(result)
	}

	useEffect(() => {
		getDetail(params.id)
	}, [])

	return (
		<div>{detail}</div>
	)
}
```

#### useSearchParams

获取 URL 中的参数，等价于 `new URLSearchParams(window.location.pathname)`。

场景应用：获取 URLSearchParams 中的 id 查询详情。

```tsx
import { useSearchParams } from 'pure-react-router'

export default function App() {
	const searchParams = useSearchParams()
	const [detail, setDetail] = useState()

	const getDetail = async(id: string) => {
		const result = await promise()
		setDetail(result)
	}

	useEffect(() => {
		getDetail(searchParams.get('id'))
	}, [])

	return (
		<div>{detail}</div>
	)
}
```

## Todo

- [ ] 探索集成权限控制
