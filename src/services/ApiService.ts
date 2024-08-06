export default class ApiService {
    static getApiServiceUrl(): string {
        console.log(`This is supposed to be the NGINX server address: ${window._env_.REACT_APP_NGINX_ADDRESS}`)
        if (typeof window._env_.REACT_APP_NGINX_ADDRESS === 'undefined') {
            throw "API URL undefined!!"
        }
        return window._env_.REACT_APP_NGINX_ADDRESS;
    }

    static async uploadUser(user: any, isAuthenticated: boolean, token: String) {
        try {
            const apiUrl = ApiService.getApiServiceUrl();
            //userId is user.sub except only the parts of the string after |
            const userId = (user.sub?.split("|")[1]) ?? '';

            // Check if user already exists in database
            const checkUrl = `${apiUrl}/users/checkUser/${userId}`;
            const checkResponse = await fetch(checkUrl);
            const checkData = await checkResponse.json();
            if(checkData.exists){
                console.log("User already exists");
                return;
            }

            const userForDB = {
                username: user.email, 
                userId: userId,
                images: []
            };

            // Make the POST request to server and console.log the response
            const uploadUrl = `${apiUrl}/users/upload`;
            const response = await fetch(uploadUrl, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userForDB),
            });
            const responseData = await response.json();
            console.log("User data uploaded");
            console.log(responseData);
            } catch (error) {
            console.error("Error uploading user data", error);
        }
    };

    static async getUser(user: any, token: String) {
        if (user && user.email) {
            try {
                const apiUrl = ApiService.getApiServiceUrl();
                //userId is user.sub except only the parts of the string after |
                const userId = (user.sub?.split("|")[1]) ?? '';
                const response = await fetch(`${apiUrl}/users/getUser/${userId}`, {
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                  });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const userData = await response.json();
                console.log(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
          }
    };
}