import {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../assets/css/HomePage.css'
import ApiService from "../services/ApiService";


export default function Home() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const uploadUser = async () => {
      if(isAuthenticated && user) {
        const token = await getAccessTokenSilently();
        ApiService.uploadUser(user, isAuthenticated, token);
      }
    }
    uploadUser();
  }, [user, isAuthenticated, getAccessTokenSilently]);

  return (
    <div>
      <img alt="Mangrove" src={require('../assets/resources/MangroveHome.jpg')} />
    </div>
  );
}