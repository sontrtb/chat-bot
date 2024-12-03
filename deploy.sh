#!/bin/bash

# Build React project
npm install
echo "Building project with npm..."
npm run build

# Build Docker image
echo "Building Docker image..."
sudo docker build -t chatbotfe-frontend .

# Xóa container cũ nếu tồn tại
echo "Removing old container (if exists)..."
sudo docker rm -f chatbotfe-container || true

# Chạy container mới
echo "Running new container..."
sudo docker run -d -p 8088:80 --name chatbotfe-container --network cb-network chatbotfe-frontend

echo "Deployment completed successfully!"