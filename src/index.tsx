import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './services/AccountService';
import App from './App';

const clientId = "238260495393-eefdr8rlaip1ckd4omve4ptf1m0c1bbn.apps.googleusercontent.com";

console.log(clientId);

ReactDOM.render(
  <GoogleOAuthProvider clientId={clientId}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
