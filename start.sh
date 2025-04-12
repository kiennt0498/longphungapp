#!/bin/bash

# Tự động lấy IP theo hệ điều hành
LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || hostname -I 2>/dev/null | awk '{print $1}' || ipconfig | grep -i "IPv4" | awk -F: '{print $2}' | sed 's/^[ \t]*//')

if [ -z "$LOCAL_IP" ]; then
  echo "❌ Không thể lấy địa chỉ IP. Vui lòng nhập tay:"
  read -p "Nhập IP: " LOCAL_IP
fi

echo "🚀 Detected Local IP: $LOCAL_IP"

export REACT_APP_BASE_URL=http://$LOCAL_IP:8080
export CORS_ALLOWED_ORIGINS=http://$LOCAL_IP:3000

# Kiểm tra Docker daemon
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker daemon chưa chạy. Vui lòng mở Docker Desktop rồi thử lại."
  exit 1
fi

# Build và chạy
docker-compose up --build
