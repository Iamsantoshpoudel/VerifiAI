# 1️⃣ Base image
FROM node:18.20.2-alpine AS builder

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4️⃣ Copy rest of the project
COPY . .

# 5️⃣ Build the app
RUN npm run build

# 6️⃣ Production image
FROM node:18.20.2-alpine AS runner

# Upgrade packages to fix vulnerabilities
RUN apk update && apk upgrade --no-cache

WORKDIR /app

ENV NODE_ENV=production

# 7️⃣ Copy from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 8️⃣ Expose port
EXPOSE 3000

# 9️⃣ Start the app
CMD ["npm", "start"]
