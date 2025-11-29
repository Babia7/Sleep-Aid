# Use Node 20 alpine as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app's source code
COPY . .

# ARGS for build time variables (This allows us to pass the key during build)
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY

# Build the app (Vite will bake the API key into the code here)
RUN npm run build

# Cloud Run expects the app to listen on port 8080
ENV PORT=8080
EXPOSE 8080

# Start the app using Vite's preview server
CMD ["npm", "run", "preview", "--", "--port", "8080", "--host"]
