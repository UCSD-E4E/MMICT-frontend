import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Header() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Mangrove Monitoring
      </Link>
      <ul>
        <CustomLink to="/Register">Register</CustomLink>
        <CustomLink to="/Login">Login</CustomLink>
        <CustomLink to="/Visualization">Visualization</CustomLink>
        <CustomLink to="/Settings">Settings</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}