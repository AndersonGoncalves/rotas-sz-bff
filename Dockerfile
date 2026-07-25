# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx tsc

# Stage 2: produção (segura e enxuta)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# Mudar permissão das pastas para o usuário 'node'
RUN chown -R node:node /app

# Usar usuário não-root por segurança
USER node

EXPOSE 3001
CMD ["node", "dist/main.js"]