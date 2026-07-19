FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build

FROM nginx:1.27-alpine

RUN rm -rf /etc/nginx/conf.d/*

COPY --from=build /app/dist /usr/share/nginx/html

RUN cat > /etc/nginx/conf.d/default.conf <<'EOF'
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

    location ~* \.(?:js|css|woff2?|ttf|svg|png|jpg|jpeg|gif|ico)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        try_files $uri =404;
    }

    location / {
        add_header Cache-Control "no-cache";
        try_files $uri $uri/ /index.html;
    }

    location /healthz {
        return 200 "frontend-ok\n";
        add_header Content-Type text/plain;
    }
}
EOF

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
