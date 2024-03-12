## Available Scripts

In the project directory, you can run:

### `npm start`

## Environment Variables

Stored in .env and .env.production for the server to use without being exposed to users.
You will need:
- REACT_APP_AUTH0_AUDIENCE: Auth0 API audience 
- REACT_APP_AUTH0_DOMAIN: Auth0 regular application domain
- REACT_APP_AUTH0_CLIENT_ID: Auth0 user (your account) userID
- REACT_APP_API_SERVER_URL: Server URL to the central webserver
- PORT: Optional since docker can specify port, but should be 8080

## General guidethrough

The general commands implemented in ApiService.ts are uploadUser, getUser, getImages, getClassifications, and uploadClassification, which are called in frontend components. **None of these will run unless the user is logged in and authenticated with Auth0. Please use Google login for now, I have yet to test with custom logins**
- **uploadUser:** called everytime a user is on the homepage, since users that login are automatically directed there. If the user newly logged in, it creates that user in the database. Otherwise, it does nothing.
- **getUser:** gets user information from MongoDB, called everytime the user visits the profile page for now.
- **getImages:** implemented in ApiService.ts, but not currently called in components
- **getClassifications:** called everytime the user visits the visualization page, it is stored in a variable classifications.
- **uploadClassification:** uploads JSON to MongoDB and associated it with a logged in User. Currently, you can upload classifications by going to AboutUs page and clicking the upload classification button (temporary). To change the file that is uploaded, just change the file imported in AboutUs.tsx.


## If you are getting 404 errors when running on docker:

Add the line `try_files $uri $uri/ /index.html;` to /etc/nginx/conf.d/default.conf such that 
```
location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
}
```
becomes
```
location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
}
```