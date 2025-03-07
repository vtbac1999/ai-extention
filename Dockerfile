# Stage 1: Build ứng dụng
FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Chạy ứng dụng
FROM node:18
WORKDIR /app
COPY --from=builder /app ./

EXPOSE 4001
CMD ["npm", "run", "start"]
