import React, { useEffect, useState} from "react";
import '../assets/css/MenuBar.css';
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "./logout-button";
import { LoginButton } from "./login-button";
import { Link, useLocation } from "react-router-dom";

export const MenuBar = () => {
    // const { isAuthenticated } = useAuth0();
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [darkNavbar, setDarkNavbar] = useState(true);

    let path = useLocation().pathname;
    const pathsThatNeedLightNavbar = ['/Visualization']

    useEffect(() => {
        if(pathsThatNeedLightNavbar.includes(path)){
            setDarkNavbar(false);
        } else {
            setDarkNavbar(true);
        }
    }, [path])
    

    const toggleHamburger = () => {
        setIsHamburgerOpen(!isHamburgerOpen);
    };

    return (
        <div className={`nav-container ${darkNavbar ? '' : 'light-navbar'}`}>
            <div className="logo">
                <Link to="/" className="logo-link">Mangrove Monitoring</Link>
            </div>
            <div id="mainListDiv" className="main_list">
                <Link className="navlink" to="/">Home</Link>
                <Link className="navlink" to="/AboutUs">About Us</Link>
                <Link className="navlink" to="/Visualization">Visualization</Link>
                {/* {isAuthenticated && ( */}
                    <>
                        <Link className="navlink" to="/Profile">Profile</Link>
                    </>
                {/* )} */}
                {/* {!isAuthenticated && ( */}
                    <>
                        <LoginButton buttonClass="navlink"/>
                    </>
                {/* )} */}
                {/* {isAuthenticated && ( */}
                    {/* <>
                        <LogoutButton buttonClass="navlink"/>
                    </> */}
                {/* )} */}
            </div>
            <button className={`navTrigger ${darkNavbar ? '' : 'light-navbar'}`} onClick={toggleHamburger}>
                <i></i>
                <i></i>
                <i></i>
            </button>
            <div id='hamburger-nav' className={`${isHamburgerOpen ? 'visible' : ''}`}>
                <div id="hamburger-links">
                    <Link className="hamburger-link" to="/">Home</Link>
                    <Link className="hamburger-link" to='/AboutUs'>About Us</Link>
                    <Link className="hamburger-link" to="/Visualization">Visualization</Link>
                    <Link className="hamburger-link" to="/Profile">Profile</Link>
                    {/* {!isAuthenticated && ( */}
                            <>
                                <LoginButton/>
                            </>
                        {/* )} */}
                        {/* {isAuthenticated && (
                            <>
                                <LogoutButton/>
                            </>
                    )} */}
                </div>
            </div>
        </div>
    );

}