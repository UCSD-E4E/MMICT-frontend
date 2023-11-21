import React, { useState } from "react";
import '../assets/css/MenuBar.css';
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "./logout-button";
import { LoginButton } from "./login-button";

export const MenuBar = () => {  
    const { isAuthenticated } = useAuth0();

    return (
        <div className="nav">
            <div className="container">
                <div className="logo">
                    <a href="/" className="navlink">Mangrove Monitoring</a>
                </div>
                <div id="mainListDiv" className="main_list">
                    <ul>
                        <li><a className="navlink" href="/AboutUs">About Us</a></li>
                        <li><a className="navlink" href="/Visualization">Visualization</a></li>
                        <li><a className="navlink" href="#">Services</a></li>
                        <li><a className="navlink" href="/Profile">Profile</a></li>
                        {!isAuthenticated && (
                            <>
                                <LoginButton />
                            </>
                        )}
                        {isAuthenticated && (
                            <>
                                <LogoutButton />
                            </>
                        )}

                    </ul>
                </div>
                <button className="navTrigger">
                    <i></i>
                    <i></i>
                    <i></i>
                </button>
                <div id='hamburger-nav'>
                    <a href='/AboutUs'>About Us</a>
                    <a href="/Visualization">Visualization</a>
                    <a href="#">Services</a>
                    <a href="/Profile">Profile</a>
                    {!isAuthenticated && (
                            <>
                                <LoginButton/>
                            </>
                        )}
                        {isAuthenticated && (
                            <>
                                <LogoutButton />
                            </>
                    )}
                </div>
            </div>
        </div>
    );

}