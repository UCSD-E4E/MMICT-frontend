import React from "react";
import { useEffect } from "react";
import ApiService from "../services/ApiService";
import { useAuth0 } from "@auth0/auth0-react";

export default function AboutUs() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  // the file we use to upload as a classification
  var classify_json = require('../components/TestClassify.json');

  // upload classifications to pull from mongo
  // this is a temporary button to test uploadClassification
  const uploadClassification = async () => {
    if(isAuthenticated && user) {
      const token = await getAccessTokenSilently();
      ApiService.uploadClassification(user, token, classify_json);
    }
  };

  return (
      <div>
        <h1>About Us</h1>
        <button onClick={() => uploadClassification()}>Upload Classification</button>
      </div>
    );
  }