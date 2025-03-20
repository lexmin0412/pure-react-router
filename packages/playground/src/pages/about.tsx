import { Link } from "pure-react-router";

export default function About() {
  return <div>
  <div>
      <Link to='/home'>跳转 /home</Link>
  </div>
  <div>
      <Link to='/redirect'>跳转 /redirect</Link>
  </div></div>
}