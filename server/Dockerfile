# Multi-Stage Build for Server
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copy package.json and lock file
COPY package.json bun.lock* ./

# Install all dependencies (frozen lockfile for predictability)
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build application using Bun (compiles index.ts to JS)
RUN bun run build

# Remove source code after build to keep image clean
RUN rm -rf ./src

ENV NODE_ENV=production

# Server's default port
EXPOSE 8000

# Start from built dist/index.js
CMD ["bun", "dist/index.js"]
