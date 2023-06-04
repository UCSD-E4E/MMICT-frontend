import React from "react";
import {MenuBar} from "../components/MenuBar"
import '../assets/css/HomePage.css'


export default function Home() {
  return (
    <div>
      <MenuBar />
      <img alt="Mangrove" src={require('../assets/resources/MangroveHome.jpg')} />
    </div>

  );
}