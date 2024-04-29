##### Start Build Container
FROM node:18-alpine AS build

# Create a working directory to perform our build in
WORKDIR /usr/src/app

# Do this separately so that we can cache it
COPY package*.json ./
# Using npm ci will install only from package-lock.json
RUN npm ci

# Copy all the project files
COPY . .

# Do the build
RUN npm run build

##### Start Deploy Container
FROM nginx:alpine as production
# http requests
EXPOSE 80 

WORKDIR /usr/share/nginx/html

# Clear the default pages
RUN rm -rf ./*
# Copy all static assets
COPY --from=build /usr/src/app/build /usr/share/nginx/html
# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]