# Hono Starter

A hono starter boilerplate for TypeScript with minimal dependencies and clean architecture. All dependencies are
initiated at the start of the application and passed to the controllers and services.

## Stack

- Authentication: JWT
- Validation: Zod
- Worker: BullMQ
- Logging: Pino
- ORM: Drizzle
- Queue: Redis
- DB: MySQL
- Runtime: NodeJS
- Framework: Hono
- Formatter: Prettier
- Language: TypeScript
- Package Manager: PNPM

## Install dependencies

```bash
pnpm install
pnpm install -g pino-pretty
```

## Run the app

Create a new file `.env` in the root folder and copy contents from the `.env.template` file.

```bash
docker compose up -d
pnpm run dev
```

```bash
open http://localhost:3000
```

## Migration

### Generate

```bash
pnpm run db:generate
```

### Migrate

```bash
pnpm run db:migrate
```

### Drop

```bash
pnpm run db:drop
```

## License

MIT
