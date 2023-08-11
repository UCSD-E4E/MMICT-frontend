import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    // Log out button will always remain constant
    // eslint-disable-next-line @shopify/jsx-no-hardcoded-content
    <button type="submit" className="button__logout" onClick={handleLogout}>
      Log Out
    </button>
  );
};
