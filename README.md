# Pure React Router

![version](https://img.shields.io/npm/v/pure-react-router)
![downloads-month](https://img.shields.io/npm/dm/pure-react-router)

## 介绍

基于 React 的 **超轻量** 路由库，参考了 React Router 但大幅精简了 API。

- 快速迁移，与 React Router 的核心 API 基本一致
- 轻量简洁，除宿主自带 React 外，无任何第三方依赖

### 为什么要有 Pure React Router?

每次创建新项目时，我一般习惯将基础依赖如 React、React Router 等升级到最新的稳定版本，但当我将旧的路由代码迁移到新的项目时，发现 React Router API 又发生了变更导致运行时报错 [^崩溃^]。

压垮骆驼的最后一根稻草，是在 [React Conf 2024 上，Remix 团队宣布在即将发布的 React Router v7.0 中，将 React Router 和 Remix 进行合并](https://remix.run/blog/merging-remix-and-react-router)，是的没看错，它正式成为了一个全栈框架。

众所周知，对于大型框架如 Next.js、Tanstack 等的路由系统为了支持复杂的功能，往往会有繁杂的 API 和不知隐藏在何处的文档，而这次，我再也不想将就了。Pure React Router 由此应运而生，你再也不用担心你的路由库会变成一个巨石框架的一部分了。

## 安装

```shell
pnpm install pure-react-router
```

## API

### 组件

#### BrowserRouter

路由容器。接收一个扁平的 routes 数组配置。

属性：

- `basename` 路由前缀
- `routes` 路由配置

场景应用：在应用入口文件中定义路由结构。

```tsx
const RouteList = [
  { path: "/default-page", component: DefaultPage },
  { path: "/others-page", component: OthersPage },
  { path: "/", component: Test5 },
];

const App = () => {
  return (
    <BrowserRouter routes={RouteList} basename='/webapp'>
      页面内容 (内部需嵌套 <Route /> 组件使用)
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### Route

路由组件，根据路由变化自动切换渲染内容。

```tsx
const App = () => {
  return (
    <BrowserRouter routes={RouteList} basename='webapp'>
      {/* 头部 */}
      <Header />
      <Main>
        {/* 左侧菜单 */}
        <Sider />
        {/* 路由组件 */}
        <Route />
      </Main>
    </BrowserRouter>
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

属性：

- `className` a 标签类名，可选
- `to` 目标路径(无需拼接 basename)
- `children` 链接文本元素(可以是 React 组件)

场景应用：跳转到其他路由。

```tsx
export default function App() {
  return <Link className="text-blue" to="/test1">test1</Link>
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

- [ ] 补充最佳实践
- [ ] 探索集成权限控制
