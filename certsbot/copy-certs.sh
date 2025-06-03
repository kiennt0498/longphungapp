# Tên domain chính đã đăng ký SSL
DOMAIN="longphungcrm.info.vn"

# Đường dẫn chứa chứng chỉ được Certbot cấp
SRC="/etc/letsencrypt/live/$DOMAIN"

# Đường dẫn nơi cần sao chép chứng chỉ để NGINX sử dụng (volume đã mount)
DEST="/LongPhungFE/certs"

echo "🔄 Đang sao chép chứng chỉ từ $SRC đến $DEST"

# Sao chép file chứng chỉ
cp "$SRC/fullchain.pem" "$DEST/fullchain.pem"
cp "$SRC/privkey.pem" "$DEST/privkey.pem"

# Gán quyền đọc để tránh lỗi NGINX không load được
chmod 644 "$DEST/fullchain.pem" "$DEST/privkey.pem"

echo "✅ Đã sao chép chứng chỉ mới"

# Gửi tín hiệu reload tới container NGINX (tên container: longphungfe)
# Bạn cần đảm bảo container này đang chạy
docker kill --signal=HUP longphungfe && \
echo "🔁 Đã reload container NGINX (longphungfe)" || \
echo "⚠️ Không thể reload NGINX – có thể container chưa khởi động?"