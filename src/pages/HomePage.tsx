import { useEffect } from "react";
import "../assets/css/HomePage.css";
import { Link } from "react-router-dom";

export default function Home() {

  return (
    <div className="home-page-div home-page-div-on-mobile">
      <div className="home-page-title home-page-title-on-mobile">
        <h1 className="title-on-mobile">Mangrove Conservation</h1>
      </div>
      <div className="home-page-introduction">
        <h2 className="introduction-on-mobile">Write a brief introduction about Mangrove Monitoring here</h2>
      </div>
      <Link to="AboutUs" className="button-link">Learn More</Link>
    </div>
  );
}
