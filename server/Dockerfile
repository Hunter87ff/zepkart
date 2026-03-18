# Multi-Stage Build

# Stage 1: Build
FROM oven/bun:1-alpine AS builder

WORKDIR /build

# Copy both package.json and lock file
COPY package.json bun.lock* ./

# Install all dependencies
RUN bun install --production --frozen-lockfile

# Copy the rest of your application code
COPY . .

# Build application using Bun
RUN bun run build && rm -rf ./src

ENV NODE_ENV=production

EXPOSE 8000

CMD ["bun", "dist/index.js"]
