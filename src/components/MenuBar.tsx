import React, { useState} from "react";
import '../assets/css/MenuBar.css';
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "./logout-button";
import { LoginButton } from "./login-button";
import { Link } from "react-router-dom";

interface MenuBarProps {
    isHomeRoute: boolean;
}

export const MenuBar: React.FC<MenuBarProps> = ({ isHomeRoute }: MenuBarProps) => {
    const { isAuthenticated } = useAuth0();
    // hamburger dropdown menu
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setIsHamburgerOpen(!isHamburgerOpen);
    };

    return (
        <div className={`nav-container`}>
            <div className="logo">
                <Link to="/" className="logo-link">Mangrove Monitoring</Link>
            </div>
            <div id="mainListDiv" className="main_list">
                <Link className="navlink" to="/">Home</Link>
                <Link className="navlink" to="/AboutUs">About Us</Link>
                <Link className="navlink" to="/Visualization">Visualization</Link>
                <Link className="navlink" to="/Services">Services</Link>
                {isAuthenticated && (
                    <>
                        <Link className="navlink" to="/Profile">Profile</Link>
                    </>
                )}
                {!isAuthenticated && (
                    <>
                        <LoginButton buttonClass="navlink"/>
                    </>
                )}
                {isAuthenticated && (
                    <>
                        <LogoutButton buttonClass="navlink"/>
                    </>
                )}
            </div>
            <button className="navTrigger" onClick={toggleHamburger}>
                <i></i>
                <i></i>
                <i></i>
            </button>
            <div id='hamburger-nav' className={isHamburgerOpen ? 'visible' : ''}>
                <div id="hamburger-links">
                    <Link className="hamburger-link" to="/">Home</Link>
                    <Link className="hamburger-link" to='/AboutUs'>About Us</Link>
                    <Link className="hamburger-link" to="/Visualization">Visualization</Link>
                    <Link className="hamburger-link" to="#">Services</Link>
                    <Link className="hamburger-link" to="/Profile">Profile</Link>
                    {!isAuthenticated && (
                            <>
                                <LoginButton/>
                            </>
                        )}
                        {isAuthenticated && (
                            <>
                                <LogoutButton/>
                            </>
                    )}
                </div>
            </div>
        </div>
    );

}