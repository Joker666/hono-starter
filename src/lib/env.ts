import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
    PORT: z.string().default('3000'),
    LOG_LEVEL: z.string().default('info'),
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    SECRET_KEY: z.string(),
    DB_HOST: z.string().default('localhost'),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    REDIS_HOST: z.string().default('localhost'),
    REDIS_PORT: z.string().default('6379'),
});

export default envSchema.parse(process.env);
