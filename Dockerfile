FROM node:lts-slim AS build

RUN apt-get update && apt-get install -y curl unzip

RUN curl -fsSL https://bun.sh/install | bash

ARG PORT=3000

WORKDIR /src

COPY package.json bun.lockb ./
RUN ~/.bun/bin/bun install

COPY --link . .

RUN ~/.bun/bin/bun run build

# Run
FROM node:lts-slim

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output
COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]