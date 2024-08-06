import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogoutButton } from "./logout-button";
import { LoginButton } from "./login-button";
import { useAuth } from '../services/AccountService';
import '../assets/css/MenuBar.css';

export const MenuBar: React.FC = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [darkNavbar, setDarkNavbar] = useState(true);
  const { isAuthenticated } = useAuth();

  let path = useLocation().pathname;
  const pathsThatNeedLightNavbar = ['/Visualization'];

  useEffect(() => {
    if (pathsThatNeedLightNavbar.includes(path)) {
      setDarkNavbar(false);
    } else {
      setDarkNavbar(true);
    }
  }, [path]);

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
        {isAuthenticated && (
          <>
            <Link className="navlink" to="/Profile">Profile</Link>
            <LogoutButton buttonClass="navlink button__logout" />
          </>
        )}
        {!isAuthenticated && (
          <LoginButton buttonClass="navlink button__login" />
        )}
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
          {isAuthenticated && (
            <>
              <Link className="hamburger-link" to="/Profile">Profile</Link>
              <LogoutButton buttonClass="hamburger-link" />
            </>
          )}
          {!isAuthenticated && (
            <LoginButton buttonClass="hamburger-link" />
          )}
        </div>
      </div>
    </div>
  );
};