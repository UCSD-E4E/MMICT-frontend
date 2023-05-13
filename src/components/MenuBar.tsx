import React from "react";
import '../assets/css/MenuBar.css';
import { Height } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";

class MenuBar extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="nav">
        <div className="container">
            <div className="logo">
                <a href="/">Mangrove Monitoring</a>
            </div>
            <div id="mainListDiv" className="main_list">
                <ul className="navlinks">
                    <li><a href="/AboutUs">About Us</a></li>
                    <li><a href="/Visualization">Visualization</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Log In</a></li>
                </ul>
            </div>
            <span className="navTrigger">
                <i></i>
                <i></i>
                <i></i>
            </span>
        </div>
    </div>
        );
    }
}

export default MenuBar;

/*
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};
export default LoginButton;
*/