
# Dockerfile for React Frontend
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Install dependencies
RUN npm install

# Build the React app
RUN npm run build

# Install serve to run the production build
RUN npm install -g serve

# Serve the build directory
CMD ["serve", "-s", "dist", "-l", "5173"]
