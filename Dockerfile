# Gunakan base image dari Railway
FROM ghcr.io/railwayapp/nixpacks:ubuntu-1722297819

# Install Node.js dan npm
RUN apt-get update && apt-get install -y nodejs npm

# Set working directory
WORKDIR /app

# Salin file package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Instal dependensi
RUN npm install

# Salin sisa kode aplikasi
COPY . .

# Expose port
EXPOSE 8080

# Command untuk menjalankan aplikasi
CMD ["node", "app.js"]
