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
EXPOSE 80

WORKDIR /usr/share/nginx/html

# Copy the config files
ADD ./conf/ /etc/nginx/

# Clear the default pages
RUN rm -rf ./*
# Copy all static assets
COPY --from=build /usr/src/app/build /usr/share/nginx/html

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]