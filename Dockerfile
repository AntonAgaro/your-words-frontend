# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR app

## Copy the package.json and package-lock.json
#COPY package*.json ./

# Copy the application code to the working directory
COPY . .

# Install dependencies
RUN npm install

# Build the Nuxt 3 app for production
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Set the command to start the app in production mode
CMD ["npm", "run", "start"]