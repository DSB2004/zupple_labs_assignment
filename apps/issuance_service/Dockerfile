FROM oven/bun:1

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl


COPY package*.json ./
COPY turbo.json ./
COPY bun.lock* ./

COPY ./packages ./packages


COPY ./apps/issuance_service ./apps/issuance_service

RUN bun i

RUN bun run prisma generate --schema ./apps/issuance_service/prisma/schema.prisma
RUN bun run build

EXPOSE 8000

CMD ["sh", "-c", "echo '--- Environment Variables ---' && env && echo '-----------------------------' && bun run prisma db push --schema ./apps/issuance_service/prisma/schema.prisma && bun run start"]