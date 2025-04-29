FROM node:20 AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm install

FROM node:20 AS server-build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm i -g pnpm && pnpm install && pnpm --filter=server build

FROM node:20 AS web-build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules 
COPY --from=server-build /app/apps/server/dist /app/apps/server/dist
COPY --from=server-build /app/apps/server/prisma /app/apps/server/prisma
COPY . .
RUN npm i -g pnpm && pnpm install && cd apps/server && npx prisma generate && cd ../../ && pnpm --filter=web build

FROM node:20-alpine AS server
WORKDIR /app
COPY --from=server-build /app/apps/server/dist ./dist
COPY --from=server-build /app/apps/server/package.json ./
COPY --from=server-build /app/apps/server/prisma ./prisma
RUN npm i -g pnpm && pnpm install --prod && npx prisma generate
ENV NODE_ENV=production

CMD ["node", "dist/main"]

FROM node:20-alpine AS web
WORKDIR /app
COPY --from=web-build /app/apps/web/.next ./.next
COPY --from=web-build /app/apps/web/package.json ./
COPY --from=web-build /app/apps/web/public ./public
COPY --from=web-build /app/apps/web/next.config.ts ./
RUN npm i -g pnpm && pnpm install --prod
ENV NODE_ENV=production

CMD ["pnpm", "start"]