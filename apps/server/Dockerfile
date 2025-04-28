FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY apps/web/package.json apps/web/package.json
COPY apps/server/package.json apps/server/package.json

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY ./apps/web ./apps/web
COPY ./apps/server ./apps/server
COPY ./tsconfig.json ./
COPY ./apps/web/tsconfig.json ./apps/web/
COPY ./apps/server/tsconfig.json ./apps/server/

WORKDIR /app/apps/server

RUN pnpm run build

CMD ["pnpm", "run", "start:prod"]