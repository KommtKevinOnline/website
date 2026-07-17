FROM node:lts-slim AS build

RUN corepack enable

ARG PORT=3000

WORKDIR /src

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY --link . .

RUN pnpm run build

# Run
FROM node:lts-slim

ENV PORT=$PORT
ENV TZ=Europe/Berlin

COPY --from=build /src/.output /src/.output
COPY --from=build /src/node_modules /src/node_modules

WORKDIR /src

CMD [ "node", ".output/server/index.mjs" ]