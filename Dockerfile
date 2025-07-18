# Stage 1: Build scratch-vm
FROM node:18 AS build-vm
WORKDIR /app/scratch-vm
COPY ../scratch-vm ./
RUN npm install && npm run build

# Stage 2: Build scratch-gui
FROM node:18 AS build-gui
WORKDIR /app/scratch-gui

# Copy scratch-gui into image
COPY scratch-storyboard-gui/ ./

# Install all dependencies (including scratch-vm)
RUN npm install

# Expose the port your app runs on
EXPOSE 8601

# Run the start script
CMD ["npm", "start"]