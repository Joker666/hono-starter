## Run the app

```bash
pnpm install
pnpm run dev
```

```bash
open http://localhost:3000
```

## Migration

### Generate

```bash
pnpm drizzle-kit generate:mysql
```

### Migrate
```bash
pnpm tsx schema/migrate.ts
```
