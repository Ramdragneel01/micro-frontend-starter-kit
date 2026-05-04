FROM node:20-slim AS build

WORKDIR /app
COPY package*.json ./
COPY babel.config.json vitest.config.js ./
COPY apps ./apps
COPY packages ./packages
COPY scripts ./scripts
COPY tests ./tests

RUN npm ci
RUN npm run build

FROM node:20-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/scripts ./scripts

EXPOSE 3000 3001 3002 3003

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "scripts/serve-shell.mjs"]
