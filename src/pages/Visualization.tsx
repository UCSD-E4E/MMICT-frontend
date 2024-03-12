import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import ApiService from '../services/ApiService';
import { useEffect } from 'react';
import LeafletMap from '../components/LeafletMap';
import '../assets/css/visualization.css';
import Stage from "../components/Stage";
import ProgressBar from "@ramonak/react-progress-bar";

export default function Visualization() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  // call to pull the classifications associated with a user
  // stores the classifications in classifications
  useEffect(() => {
    const getClassifications = async () => {
      if(isAuthenticated && user) {
        const token = await getAccessTokenSilently();
        let classifications = ApiService.getClassifications(user, token);
        console.log(classifications);
      }
    }
    getClassifications();
  }, [user, isAuthenticated, getAccessTokenSilently]);

  return (
    <div id='container'>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <ProgressBar 
        className='progress-bar'
        barContainerClassName='progress-bar-container'
        labelClassName='progress-bar-label'
        bgColor='#5E7444'
        /* Make some call to websocket here for progress value */
        completed={60}
        animateOnRender={true}
      />
      <div id='classification'>
        <div id='left-menu'>
          <Stage/>
        </div>
        <div id='right-menu'>
          <LeafletMap />
        </div>
      </div>
    </div>
  )
}