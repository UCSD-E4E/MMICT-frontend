import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
    <Auth0Provider
      domain="dev-3q7zmh6aw67jttdp.us.auth0.com"
      clientId="PVSrLMVTqIjQdMchp4KXKm5d7TuwQzP1"
      authorizationParams={{
        redirect_uri: "http://localhost:3000/"
      }}
    >
      <App />
    </Auth0Provider>,
    document.getElementById("root")
  );
