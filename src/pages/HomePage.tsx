import { useAuth0 } from "@auth0/auth0-react";
import React , {useEffect} from "react";
import '../assets/css/HomePage.css'


export default function Home() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const uploadUser = async () => {
      if (isAuthenticated && user) {
        try {
          // Get the access token
          const token = await getAccessTokenSilently();
          console.log(token);
          console.log(user);

          // Transform the Auth0 user object to match MongoDB schema
          const userForDB = {
            username: user.email, 
            images: []
          };

          // Make the POST request to server and console.log the response
          //const apiUrl = process.env.REACT_APP_API_SERVER_URL || 'https://example.com';
          const apiUrl = 'http://localhost:8081/users/upload';
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userForDB),
          });
          const responseData = await response.json();
          console.log(responseData);
        } catch (error) {
          console.error("Error uploading user data", error);
        }
      }
    };

    uploadUser();
  }, [user, isAuthenticated, getAccessTokenSilently]);

  return (
    <div>
      <img alt="Mangrove" src={require('../assets/resources/MangroveHome.jpg')} />
    </div>
  );
}