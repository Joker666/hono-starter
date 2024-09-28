# Hono Starter

A Hono starter boilerplate for TypeScript with minimal dependencies and a clean architecture. All dependencies are
initiated at the start of the application and passed to the controllers and services. A swagger API doc is attached in
the static folder: `openapi.yaml`.

### API Doc power by Swagger UI
<img width="1526" alt="Screenshot 2024-09-28 at 12 31 53 AM" src="https://github.com/user-attachments/assets/f91b5882-81f8-4268-a2d8-98987e06b18a">

### Database browser power by Drizzle Studio
<img width="1567" alt="Screenshot 2024-09-28 at 12 40 56 AM" src="https://github.com/user-attachments/assets/9ed8350b-0ded-4653-a92e-0184e2df20f7">

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
The OpenAPI YAML doc is in the `openapi` folder.

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


## License

MIT
