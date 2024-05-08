## Install dependencies

```bash
pnpm install
pnpm install -g pino-pretty
```

## Run the app

Create a new file `.env` in the root folder and copy contents from the `.env.template` file.

```bash
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
