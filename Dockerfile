# Use node 18 image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy scratch-gui and scratch-vm into the container
COPY scratch-vm ./scratch-vm
COPY scratch-gui ./scratch-gui

# Enter scratch-gui directory
WORKDIR /app/scratch-gui

# Install dependencies, respecting the file:../scratch-vm path
RUN npm install

# Build the React app
RUN npm run build

# Expose the port your app runs on
EXPOSE 8601

# Run the start script
CMD ["npm", "start"]
