import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import '../assets/css/Profile.css';

export default function Profile(){
  const { user } = useAuth0();

  React.useEffect(() => {
    if(user) console.log(user);
  }, [user]);

  if (!user) {
    return null;
  }
  return (
    <div id="profile-page">
      <div id="left-profile-menu">
        <div id="inner-color-layer">
          <div id="profile-account">
            <img
              id="profile-avatar"
              src={user.picture}
              alt="Profile"
            />
            <div className="profile-info">
              <h2 style={{ margin:5}}>{user.name}</h2>
              <span>{user.email}</span>
            </div>
          </div>
        </div>
      </div>
      <div id="right-images-menu">
        <h1 id="images-header" >Current Images:</h1>
      </div>
    </div>
  );
};

/*
<div className="content-layout">
    <h1 id="page-title" className="content__title">
      Profile Page
    </h1>
    <div className="content__body">
      <div className="profile-grid">
        <div className="profile__header">
          <img
            src={user.picture}
            alt="Profile"
            className="profile__avatar"
          />
          <div className="profile__headline">
            <h2 className="profile__title">{user.name}</h2>
            <span className="profile__description">{user.email}</span>
          </div>
        </div>
        <div className="profile__details">
        </div>
      </div>
    </div>
  </div>
*/