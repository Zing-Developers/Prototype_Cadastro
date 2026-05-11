FROM oven/bun:1-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

FROM base AS deps
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN bun run build

FROM base AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S vitejs -u 1001

COPY --from=builder --chown=vitejs:nodejs /app/dist ./dist
COPY --from=builder --chown=vitejs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=vitejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=vitejs:nodejs /app/vite.config.* ./

USER vitejs

EXPOSE 4173
ENV PORT=4173
ENV HOST=0.0.0.0

CMD ["bun", "run", "preview", "--host", "0.0.0.0", "--port", "4173"]