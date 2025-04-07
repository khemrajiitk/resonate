# Stage 1: Build Stage
FROM node:22.13.1-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Vite app for production
RUN npm run build


# Stage 2: Production Stage
FROM nginx:alpine

# Copy the built app from the builder stage to the Nginx HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Add a custom Nginx configuration for SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]