# ==========================================
# 1. BUILD STAGE
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ==========================================
# 2. SERVE STAGE (NGINX)
# ==========================================
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Clean default html and copy build artifacts
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
