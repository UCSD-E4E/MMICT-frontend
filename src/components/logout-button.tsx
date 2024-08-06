import React from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AccountService';

interface LogoutButtonProps {
  buttonClass: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ buttonClass }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <button className={`button__logout ${buttonClass}`} onClick={handleLogout}>
    Log Out
    </button>
  );
};
