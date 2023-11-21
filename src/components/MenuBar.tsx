import React, { useState} from "react";
import '../assets/css/MenuBar.css';
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "./logout-button";
import { LoginButton } from "./login-button";

export const MenuBar = () => {  
    const { isAuthenticated } = useAuth0();
    // hamburger dropdown menu
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setIsHamburgerOpen(!isHamburgerOpen);
    };

    return (
        <div className="nav">
            <div className="nav-container">
                <div className="logo">
                    <a href="/" className="logo-link">Mangrove Monitoring</a>
                </div>
                <div id="mainListDiv" className="main_list">
                    <a className="navlink" href="/AboutUs">About Us</a>
                    <a className="navlink" href="/Visualization">Visualization</a>
                    <a className="navlink" href="#">Services</a>
                    <a className="navlink" href="/Profile">Profile</a>
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
                        <a className="hamburger-link" href="/">Home</a>
                        <a className="hamburger-link" href='/AboutUs'>About Us</a>
                        <a className="hamburger-link" href="/Visualization">Visualization</a>
                        <a className="hamburger-link" href="#">Services</a>
                        <a className="hamburger-link" href="/Profile">Profile</a>
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
        </div>
    );

}