import React from "react";
import AppBar from "../components/MenuBar"
import '../assets/css/HomePage.css'


export default function Home() {
  return (
    <div>
      <AppBar />
      <img alt="Mangrove" src={require('../assets/resources/MangroveHome.jpg')} />
    </div>

  );
}