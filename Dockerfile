# Dockerfile

# Set base image
FROM ghcr.io/railwayapp/nixpacks:ubuntu-1722297819

# Set working directory
WORKDIR /app/

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose port
EXPOSE 8080

# Command to run your application
CMD ["node", "app.js"]
