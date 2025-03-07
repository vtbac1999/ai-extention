# Sử dụng Node.js làm base image
# Cấu trúc multi-stage giúp giảm kích thước image cuối cùng
# syntax=docker.io/docker/dockerfile:1
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy lockfiles để quản lý dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Cài đặt dependencies dựa trên trình quản lý package được dùng
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Build ứng dụng Next.js
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Image production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Tạo user để chạy ứng dụng một cách an toàn
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Chạy Next.js ở chế độ `standalone` để giảm dung lượng image
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Chạy bằng user `nextjs`
USER nextjs

EXPOSE 3000

# Đảm bảo ứng dụng lắng nghe trên mọi địa chỉ
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Chạy Next.js với standalone output
CMD ["node", "server.js"]
