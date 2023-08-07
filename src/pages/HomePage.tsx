import React from "react";

import { MenuBar } from "../components/MenuBar";
import "../assets/css/HomePage.css";

export default function Home() {
  const altText = "Mangrove";
  return (
    <>
      <MenuBar />
      <img
        alt={altText}
        src={require("../assets/resources/MangroveHome.jpg")}
      />
    </>
  );
}
