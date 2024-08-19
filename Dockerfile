##### Start Build Container
FROM --platform=linux/amd64 node:18-alpine AS build

# Create a working directory to perform our build in
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies using npm ci for a clean install based on package-lock.json
RUN npm ci

# Copy the rest of the project files
COPY . .

# Build the project
RUN npm run build

##### Start Deploy Container
FROM nginx:alpine as production

# Install envsubst for environment variable substitution
RUN apk add --no-cache gettext
# Add bash
RUN apk add --no-cache bash

# Copy the template configuration file
COPY nginx.conf.template /etc/nginx/nginx.conf.template

# Expose the port
EXPOSE ${PORT}

# Set the working directory where our static content is stored
WORKDIR /usr/share/nginx/html

# Clear the default pages
RUN rm -rf ./*

# Copy all static assets from the build stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html
# Copy over bash script for loading env variables during run-time
COPY ./scripts/env.sh .
# Make our shell script executable
RUN chmod +x env.sh

# Use envsubst to replace environment variables and generate the final nginx.conf, then start Nginx
# This is done right before running the app, but not at build-time of the image
CMD ["/bin/sh", "-c", "envsubst '${PORT} ${WEBSERVER_ADDRESS}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && /bin/bash /usr/share/nginx/html/env.sh && nginx -g 'daemon off;'"]
