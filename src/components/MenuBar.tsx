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
                    <a href="/">Mangrove Monitoring</a>
                </div>
                <div id="mainListDiv" className="main_list">
                    <ul className="navlinks">
                        <li><a href="/AboutUs">About Us</a></li>
                        <li><a href="/Visualization">Visualization</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="/Profile">Profile</a></li>
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
                <span className="navTrigger">
                    <i></i>
                    <i></i>
                    <i></i>
                </span>
            </div>
        </div>
    );

}