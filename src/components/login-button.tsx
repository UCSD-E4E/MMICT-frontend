import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../services/AccountService';
import accountService from '../services/AccountService';

interface LoginButtonProps {
  buttonClass: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ buttonClass }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        accountService.signin(credentialResponse);
        login(credentialResponse);
        navigate("/profile");
      }}
      onError={() => {
        console.error('Login Failed');
      }}
    />
  );
};
