# Step 1: Build the frontend
FROM node:20.13.0 as build-stage

WORKDIR /app

# Install frontend dependencies and build it
COPY client/package*.json ./client/
RUN cd client && npm install -g husky && npm install --legacy-peer-deps
COPY client ./client
RUN cd client && npm run build

# Step 2: Prepare the backend
FROM node:20.13.0 as backend-stage

WORKDIR /app

# Install backend dependencies
COPY server/package*.json ./server/
RUN cd server && npm install
COPY server ./server

# Expose the backend port
EXPOSE 5000

# Run the backend server
CMD ["node", "server/server.js"]

# Step 3: Use Nginx to serve the frontend
FROM nginx:alpine as production

# Copy the built frontend files to Nginx
COPY --from=build-stage /app/client/build /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the frontend
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
