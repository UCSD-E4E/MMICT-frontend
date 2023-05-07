import React from "react";
import AppBar from "../components/AppBar"
//import MangrovePic from '../components/resources/Mangrove.jpg'
export default function Home() {
    return (
      <div>
        <AppBar/>
        <h1>Mangrove Monitoring Home Page</h1>
        <img /*src={MangrovePic} alt="" *//>
      </div>
      
    );
  }