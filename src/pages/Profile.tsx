import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AccountService';
import accountService from '../services/AccountService';
import '../assets/css/Profile.css';
import UserLinks from '../components/UserLinks';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userData } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const jwt = accountService.jwt;
    if (jwt) {
      setToken(accountService.credential?.credential || null);
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return (
      <div className="not-logged-in">
        <h1>Not Logged In</h1>
      </div>
    );
  }

  if (!userData) {
    return null; // or a loading spinner
  }

  const imageUrls = [
    "https://s3.amazonaws.com/mangrove-monitoring-bucket/testing-image1.jpg",
    "https://s3.amazonaws.com/mangrove-monitoring-bucket/testing-image2.jpg",
  ];

  return (
    <div id="profile-page">
      <div id="left-profile-menu">
        <div id="inner-color-layer">
          <div id="profile-account">
            <img
              id="profile-avatar"
              src={userData.picture || "https://www.w3schools.com/howto/img_avatar.png"}
              alt="Profile"
            />
            <div className="profile-info">
              <h2>{userData.name}</h2>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>First Name:</strong> {userData.given_name}</p>
              <p><strong>Last Name:</strong> {userData.family_name}</p>
              <p><strong>Unique ID:</strong> {userData.sub}</p>
            </div>
          </div>
        </div>
      </div>
      <div id="right-images-menu">
        <h1 id="images-header">Current Images:</h1>
        <ul className="unique-image-list">
          {imageUrls.map((url, index) => (
            <li key={index} className="unique-image-item">
              <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
            </li>
          ))}
        </ul>
      </div>
      <div id="user-links">
        <h2>User Links</h2>
        {token && <UserLinks token={token} />}
      </div>
    </div>
  );
};

export default ProfilePage;