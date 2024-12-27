# Stage 1: Build the application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Setup env vars
ENV NODE_ENV=production

# Install dependencies
RUN npm install && npm cache clean --force

# Copy the application code
COPY . .

# Build the application
RUN npm run build


# Stage 2: Serve the application
FROM nginx:alpine

# Copy the built application to Nginx HTML folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=15s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -fsSL http://localhost:80/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
