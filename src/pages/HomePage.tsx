import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../assets/css/HomePage.css";
import ApiService from "../services/ApiService";
import { Link } from "react-router-dom";

export default function Home() {
  // const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  // Whats the status on Auth0? Kane, Ryan?

  // useEffect(() => {
  //   const uploadUser = async () => {
  //     if (isAuthenticated && user) {
  //       const token = await getAccessTokenSilently();
  //       ApiService.uploadUser(user, isAuthenticated, token);
  //     }
  //   };
  //   uploadUser();
  // }, [user, isAuthenticated, getAccessTokenSilently]);

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
