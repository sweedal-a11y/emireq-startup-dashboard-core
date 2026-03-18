# ---- Build stage ----
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY . .
RUN npm run build

# ---- Run stage ----
FROM nginx:alpine

LABEL org.opencontainers.image.title="Emireq Startup Dashboard"
LABEL org.opencontainers.image.description="Startup dashboard for Google Cloud Run"

# Write a Cloud Run-compatible nginx config.
# - pid and all temp paths use /tmp (always writable, no permission issues)
# - gzip enabled for JS/CSS/fonts
# - Vite hashed assets cached 1 year (immutable)
# - index.html never cached (SPA entry point, must pick up new deploys)
# - Security headers on all responses
RUN printf '\
pid /tmp/nginx.pid;\n\
worker_processes auto;\n\
events { worker_connections 1024; }\n\
http {\n\
  include /etc/nginx/mime.types;\n\
  default_type application/octet-stream;\n\
  sendfile on;\n\
  gzip on;\n\
  gzip_types text/plain text/css application/javascript application/json image/svg+xml font/otf font/ttf;\n\
  gzip_min_length 1024;\n\
  access_log /dev/stdout;\n\
  error_log /dev/stderr;\n\
  client_body_temp_path /tmp;\n\
  proxy_temp_path /tmp;\n\
  fastcgi_temp_path /tmp;\n\
  uwsgi_temp_path /tmp;\n\
  scgi_temp_path /tmp;\n\
  server {\n\
    listen 8080;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    add_header X-Frame-Options "SAMEORIGIN" always;\n\
    add_header X-Content-Type-Options "nosniff" always;\n\
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;\n\
    location ~* ^/assets/ {\n\
      add_header Cache-Control "public, max-age=31536000, immutable";\n\
      try_files $uri =404;\n\
    }\n\
    location ~* \.(otf|ttf|woff|woff2)$ {\n\
      add_header Cache-Control "public, max-age=31536000, immutable";\n\
      add_header Access-Control-Allow-Origin "*";\n\
      try_files $uri =404;\n\
    }\n\
    location = /index.html {\n\
      add_header Cache-Control "no-cache, no-store, must-revalidate";\n\
      try_files $uri =404;\n\
    }\n\
    location / {\n\
      try_files $uri $uri/ /index.html;\n\
    }\n\
  }\n\
}\n\
' > /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
