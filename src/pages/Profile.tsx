import { useAuth0 } from "@auth0/auth0-react";
import React , {useEffect} from "react";
import '../assets/css/Profile.css';

export default function Profile(){
  const { user} = useAuth0();

  return (
    <div id="profile-page">
      <div id="left-profile-menu">
        <div id="inner-color-layer">
          <div id="profile-account">
            <img
              id="profile-avatar"
              src={user?.picture}
              alt="Profile"
            />
            <div className="profile-info">
              <h2 style={{ margin:5}}>{user?.name}</h2>
              {user && <span>{user.email}</span>}
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