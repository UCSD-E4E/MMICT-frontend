import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

type LogoutButtonProps = {
  buttonClass?: string;
};

export const LogoutButton: React.FC<LogoutButtonProps> = ({ buttonClass }) => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  // Use the passed `buttonClass` prop or default to 'hamburger-link'
  const className = buttonClass || 'hamburger-link';

  return (
    <button className={`button__logout ${className}`} onClick={handleLogout}>
      Log Out
    </button>
  );
};
