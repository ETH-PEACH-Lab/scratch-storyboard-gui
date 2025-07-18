# Stage 1: Build scratch-vm
FROM node:18 AS build-vm
WORKDIR /app/scratch-vm
COPY scratch-storyboard-vm/ ./
RUN npm install && npm run build

# Stage 2: Build scratch-gui
FROM node:18 AS build-gui
WORKDIR /app/scratch-gui

# Copy scratch-gui into image
COPY scratch-storyboard-gui/ ./

# 🔧 Copy built scratch-vm into parent-relative path for "file:../scratch-storyboard-vm" to work
COPY --from=build-vm /app/scratch-vm /app/scratch-storyboard-vm

# Install all dependencies (including scratch-vm)
RUN npm install

# Expose the port your app runs on
EXPOSE 8602

# Run the start script
CMD ["npm", "start"]