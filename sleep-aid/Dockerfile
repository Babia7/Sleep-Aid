# Use Node.js to build the app
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the React app (creates the static site)
RUN npm run build

# Expose the port Google Cloud expects
ENV PORT=8080
EXPOSE 8080

# Serve the app using Vite's preview command
CMD ["npm", "run", "preview", "--", "--port", "8080", "--host"]
