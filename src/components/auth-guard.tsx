import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import PageLoader from "./PageLoader";

interface AuthenticationGuardProps {
    component: React.ComponentType<any>;
}

//This handles functionality so that certain pages can only be accessed if the user is logged in
export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({ component }) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <div className="page-layout">
                <PageLoader />
            </div>
        ),
    });

    return <Component />;
};