FROM node:lts-slim as base

# Install PNPM
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ARG PORT=3000

WORKDIR /src

# Build
FROM base as build

COPY --link package.json pnpm-lock.yaml ./
RUN pnpm install

COPY --link . .

RUN pnpm build
RUN pnpm prune

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output
COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]