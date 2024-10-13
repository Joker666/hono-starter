# Hono Starter

A Hono starter boilerplate for TypeScript with minimal dependencies and a clean architecture. All dependencies are
initiated at the start of the application and passed to the controllers and services. A swagger API doc is attached in
the static folder: `openapi.yaml`.

### API Doc powered by Swagger UI
<img width="1538" alt="Screenshot 2024-09-28 at 12 48 21 AM" src="https://github.com/user-attachments/assets/7b1ea200-30ef-4ad6-937d-e6767905e41e">

### Database browser powered by Drizzle Studio
<img width="1571" alt="Screenshot 2024-09-28 at 12 46 26 AM" src="https://github.com/user-attachments/assets/c8d43dd4-9d93-4ae7-8a4c-7756b84ef9f7">

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
- API Doc: Swagger
- Formatter: Prettier
- Language: TypeScript
- Package Manager: PNPM

## Install dependencies

```bash
pnpm install
pnpm install -g pino-pretty
```

## Migration
Create a new file `.env` in the root folder and copy contents from the `.env.template` file.

```bash
docker compose up -d
```

### Generate
```bash
pnpm run db:generate
```

### Migrate
```bash
pnpm run db:migrate
```

## Run the app
```bash
pnpm run dev
open http://localhost:3000/doc
```

## API Doc
The OpenAPI YAML doc is in the `static` folder.

If you need the JSON file, it can be generated with the help of `yq`.

https://github.com/mikefarah/yq

```bash
yq eval -o=json static/openapi.yaml > static/openapi.json
```

And the JSON doc will be generated.

## Drizzle Studio For Database Browsing

```bash
pnpm drizzle-kit studio
open https://local.drizzle.studio/
```
