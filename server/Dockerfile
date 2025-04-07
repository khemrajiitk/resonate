# Use the official Node.js v122.13.1 runtime as the base image
FROM node:22.13.1-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your application listens on
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]