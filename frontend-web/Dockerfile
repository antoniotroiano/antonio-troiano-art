# FROM node:20-alpine AS builder

# WORKDIR /app
# COPY . .

# ARG NEXT_PUBLIC_API_URL
# ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# RUN npm install && npm run build

# FROM node:20-alpine

# WORKDIR /app

# COPY --from=builder /app/.next .next
# COPY --from=builder /app/public public
# COPY --from=builder /app/package.json .
# COPY --from=builder /app/node_modules node_modules

# EXPOSE 3000
# ENV NODE_ENV=production
# ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# CMD ["npm", "start"]


# ---------- Builder ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Nur package files zuerst für besseres Caching
COPY package.json package-lock.json* ./

RUN npm ci

# Rest kopieren
COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build


# ---------- Runner ----------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Standalone Output kopieren
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/cache ./cache

EXPOSE 3000

CMD ["node", "server.js"]

