# Define the base image
FROM node:18-alpine

# Set the working directory in the image
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install the application dependencies
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source inside Docker image
COPY . .

# Compile TypeScript into JavaScript
RUN npm run build

# Expose the port that your app runs on
EXPOSE 3001

# The command that starts the application
CMD [ "node", "src/server.js" ]