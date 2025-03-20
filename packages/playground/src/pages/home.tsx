import { Link } from "pure-react-router"

export default function Home() {
  return <div>
    <div>
        <Link to='/about'>跳转 /about</Link>
    </div>
    <div>
        <Link to='/redirect'>跳转 /redirect</Link>
    </div>
  </div>
}