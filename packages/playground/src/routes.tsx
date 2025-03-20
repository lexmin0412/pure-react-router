import { IRoute } from 'pure-react-router'
import Home from './pages/home'
import About from './pages/about'

export const routes: IRoute[] = [
  {
    path: '/home',
    component: () => <Home />,
  },
  {
    path: '/about',
    component: ()  => <About />,
  },
  {
    path: '/redirect',
    component: null,
    redirect: '/home',
  },
]