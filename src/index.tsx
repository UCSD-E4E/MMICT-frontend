// Need values from env variables
/* eslint-disable no-process-env */
import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";

ReactDOM.render(
  // Disabled forbidden non-null assertion because the domain and client ID will always be specified
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN!}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
    authorizationParams={{
      // Must be written as redirect_uri in order to work with Auth0
      // eslint-disable-next-line @typescript-eslint/naming-convention
      redirect_uri: "http://localhost:3000",
    }}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
