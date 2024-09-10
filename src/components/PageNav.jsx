import { NavLink } from "react-router-dom";

export default function PageNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Homepage</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/Product">Product</NavLink>
        </li>
      </ul>
    </nav>
  )
}