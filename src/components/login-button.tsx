import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

type LoginButtonProps = {
  buttonClass?: string;
};

export const LoginButton: React.FC<LoginButtonProps> = ({ buttonClass }) => {

  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };
  // Use the passed `buttonClass` prop or default to 'hamburger-link'
  const className = buttonClass || 'hamburger-link';

  return (
    <button className={`button__logout ${className}`} onClick={handleLogin}>
      Log In
    </button>
  );
};
