import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from "react-auth-kit";

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider
            authType={"cookie"}
            authName={"_auth"}
            cookieDomain={window.location.hostname}
            cookieSecure={false}
        >

            <App />

        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
