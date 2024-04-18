import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../assets/css/HomePage.css";
import ApiService from "../services/ApiService";
import { Link } from "react-router-dom";

export default function Home() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const uploadUser = async () => {
      if (isAuthenticated && user) {
        const token = await getAccessTokenSilently();
        ApiService.uploadUser(user, isAuthenticated, token);
      }
    };
    uploadUser();
  }, [user, isAuthenticated, getAccessTokenSilently]);

  return (
    <div className="home-page-div">
      <div className="home-page-title">
        <h1>Mangrove Conservation</h1>
      </div>
      <div className="home-page-introduction">
        <h2>Write a brief introduction about Mangrove Monitoring here</h2>
      </div>
      <Link to="AboutUs" className="button-link">Learn More</Link>
    </div>
  );
}
