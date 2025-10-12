FROM oven/bun:1

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl


COPY package*.json ./

COPY ./packages ./packages
COPY turbo.json ./
COPY bun.lock* ./


COPY ./apps/verification_service ./apps/verification_service



RUN bun i

RUN bun run prisma generate --schema ./apps/verification_service/prisma/schema.prisma
RUN bun run build

EXPOSE 8001

CMD ["sh", "-c", "bun run prisma db push --schema ./apps/verification_service/prisma/schema.prisma && bun run start"]
