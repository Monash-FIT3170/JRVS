# Use an official Node.js image
FROM node:20.13.0

# Create app directory
WORKDIR /usr/src/app

# Install a specific version of npm
RUN npm install -g npm@10.8.2

# Install app dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Build the app
COPY . .
RUN npm run build

# Serve the app using nginx
FROM nginx:alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
