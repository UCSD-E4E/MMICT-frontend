import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Mangrove Monitoring
      </Link>
      <ul>
        <button onClick={() => loginWithRedirect()}>Log In</button>
        <CustomLink to="/Visualization">Visualization</CustomLink>
        <CustomLink to="/Settings">Settings</CustomLink>
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}> Log Out </button>
      </ul>
    </nav>
  )
}



function CustomLink({ to, children, ...props }: { to: any; children: any }) {
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