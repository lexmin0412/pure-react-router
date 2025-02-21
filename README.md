# Pure React Router

![NPM Downloads](https://img.shields.io/npm/dm/pure-react-router)
![version](https://img.shields.io/npm/v/pure-react-router)
![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/pure-react-router/latest)
![NPM Last Update](https://img.shields.io/npm/last-update/pure-react-router)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/lexmin0412/pure-react-router)

基于 React 的 **超轻量** 路由库，参考了 React Router 但大幅精简了 API。

## 介绍

### 特性

- ✈️ **极致轻量** - 压缩后仅 1.2kb，除宿主自带 React 外，零第三方依赖
- ♻️ **平滑迁移** - 兼容 React Router 核心 API
- 🚀 **未来无忧** - 专注路由核心功能，拒绝框架膨胀
- ⚡ **TypeScript 优先** - 完整的类型定义支持

### 为什么要有 Pure React Router?

每次创建新项目时，我一般习惯将基础依赖如 React、React Router 等升级到最新的稳定版本，但当我将旧的路由代码迁移到新的项目时，发现 React Router API 又发生了变更导致运行时报错 [^崩溃^]。

压垮骆驼的最后一根稻草，是在 [React Conf 2024 上，Remix 团队宣布在即将发布的 React Router v7.0 中，将 React Router 和 Remix 进行合并](https://remix.run/blog/merging-remix-and-react-router)，是的没看错，它正式成为了一个全栈框架。

众所周知，对于大型框架如 Next.js、Tanstack 等的路由系统为了支持复杂的功能，往往会有繁杂的 API 和不知隐藏在何处的文档，而这次，我再也不想将就了。`Pure React Router` 由此应运而生，你再也不用担心你的路由库会变成一个巨石框架的一部分了。

## 快速开始

### 安装

```bash
pnpm install pure-react-router
# 或
npm install pure-react-router
# 或
yarn add pure-react-router
```

### 基础示例

```tsx
// 在根组件中初始化路由
import { BrowserRouter, Route } from "pure-react-router";
import Home from "./pages/Home";
import About from "./pages/About";

// 路由配置（支持树形结构）
const routes = [
  { path: "/home", component: Home },
  { path: "/about", component: About },
  { path: "/", redirect: "/home" }, // 支持重定向
];

export default function App() {
  return (
    <BrowserRouter routes={routes} basename="/webapp">
      <Route />
    </BrowserRouter>
  );
}
```

## 📚 核心 API

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
    <BrowserRouter routes={RouteList} basename="/webapp">
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

路由占位组件，根据路由变化自动切换渲染内容。

```tsx
const App = () => {
  return (
    <BrowserRouter routes={RouteList} basename="webapp">
      {/* 页面其他部分 */}
      <OtherLayout />
      {/* 路由组件 */}
      <Route />
    </BrowserRouter>
  );
};
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
  return (
    <Link className="text-blue" to="/test1">
      test1
    </Link>
  );
}
```

### Hooks

#### useHistory

获取 history 对象。

场景应用：监听 pathname 变更修改页面标题。

```tsx
import { useHistory } from "pure-react-router";
import pkgJson from "../package.json";

export default function App() {
  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname.includes("detail")) {
      document.title = `详情`;
    }
    document.title = pkgJson.name;
  }, [history.location.pathname]);

  return <div>Content</div>;
}
```

#### useParams

获取 URL 中的 Path 参数。

场景应用：获取 Path 中的 id 查询详情。

示例：路由定义为 `/detail/:id`, 页面实际路径为 `/detail/123`，则 `useParams()` 的返回结果为 `{id: '123'}`

```tsx
import { useState } from "react";
import { useParams } from "pure-react-router";

export default function App() {
  const params = useParams();
  const [detail, setDetail] = useState();

  const getDetail = async (id: string) => {
    const result = await promise();
    setDetail(result);
  };

  useEffect(() => {
    getDetail(params.id);
  }, []);

  return <div>{detail}</div>;
}
```

#### useSearchParams

获取 URL 中的参数，等价于 `new URLSearchParams(window.location.pathname)`。

场景应用：获取 URLSearchParams 中的 id 查询详情。

```tsx
import { useSearchParams } from "pure-react-router";

export default function App() {
  const searchParams = useSearchParams();
  const [detail, setDetail] = useState();

  const getDetail = async (id: string) => {
    const result = await promise();
    setDetail(result);
  };

  useEffect(() => {
    getDetail(searchParams.get("id"));
  }, []);

  return <div>{detail}</div>;
}
```

#### useMatchRoute

获取当前匹配的路由信息，同 `matchRoute(history.location.pathname, routes)`。

场景应用：处理 404 页面跳转逻辑。

```tsx
import {
  useMatchRoute,
  useHistory,
  PureRouterContext,
  Route,
} from "pure-react-router";

export default function App() {
  const { routes } = useContext(PureRouterContext);
  const history = useHistory();
  const { route } = useMatchRoute();

  useEffect(() => {
    if (!route) {
      history.push("/common/404");
    }
  }, [history.location.pathname]);
}
```

#### PureRouterContext

全局上下文。

场景应用：深层嵌套子组件获取 basename 配置。

```tsx
import { useContext } from "react";
import { PureRouterContext } from "pure-react-router";

export default function DeepNestedComponent() {
  const { basename } = useContext(PureRouterContext);

  return <div>当前应用：{basename}</div>;
}
```

### Utils

#### matchRoute

获取指定路径匹配的路由信息。

场景应用：特殊处理某个路由的渲染。

```tsx
import {
  matchRoute,
  useHistory,
  PureRouterContext,
  Route,
} from "pure-react-router";

export default function App() {
  const history = useHistory();
  const { routes } = useContext(PureRouterContext);
  const { route } = matchRoute("/home", routes);

  if (history.location.pathname === "/home") {
    return <Home specialPropName="" />;
  } else {
    return <Route />;
  }
}
```

### Types

#### IRoute

路由配置项。

场景应用：定义 <BrowserRouter /> 组件的 routes 属性。

```tsx
import { BrowserRouter } from "pure-react-router";

const routes: IRoute[] = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/",
    component: Home,
  },
];

export const App = () => {
  return (
    <BrowserRouter routes={routes} basename="/webapp">
      <Route />
    </BrowserRouter>
  );
};
```

## 最佳实践

### 路由懒加载

`pure-react-router` 支持路由懒加载，只需将路由配置中的 component 属性的声明方式改为 lazy 函数即可。

**要注意的是，使用 lazy 加载组件后，在 `<Route />` 组件的外层需要使用 `Suspense` 组件包裹，否则会出现运行时报错。**

```tsx
import { lazy, Suspense } from 'react';

const routes = [
  {
    path: "/dashboard",
    component: lazy(() => import('./Dashboard')),
    // 支持路由级加载状态
    loading: <DashboardSkeleton />
  }
];

function App() {
  return (
    <BrowserRouter routes={routes}>
      <Suspense fallback={<GlobalLoader />}>
        <Route />
      </Suspense>
    </BrowserRouter>
  );
}

```

### 类型安全

`pure-react-router` 提供了完整的类型定义支持，你可以在项目中直接使用。

```tsx
import type { IRoute } from 'pure-react-router';

// 类型化路由配置
const routes: IRoute[] = [
  {
    path: "/user/:id",
    component: UserPage,
  }
];
```
