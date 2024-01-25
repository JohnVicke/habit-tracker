FROM oven/bun as base

FROM base as builder
WORKDIR /app

RUN bun install --global turbo

COPY . .
RUN turbo prune @ht/elysia --docker


FROM base as installer
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/bun.lockb ./bun.lockb
RUN bun install --production

FROM base as runner
WORKDIR /app
COPY --from=installer /app/apps/elysia/package.json .

ENV NODE_ENV production
CMD ["bun", "src/index.ts"]

EXPOSE 3000
