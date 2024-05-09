import env from './lib/env';

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { cors } from 'hono/cors';
import { showRoutes } from 'hono/dev';
import { logger as httpLogger } from 'hono/logger';
import { trimTrailingSlash } from 'hono/trailing-slash';

import { NODE_ENVIRONMENTS } from './lib/constants';
import { connection } from './lib/database';
import { logger } from './lib/logger';
import { tracing } from './web/middlelayer/tracing';
import { Routes } from './web/routes';

const app = new Hono();

// Generic middlewares
app.use(cors());
app.use(tracing);
app.use(compress());
app.use(httpLogger());
app.use(trimTrailingSlash());

await connection.ping();
logger.info('Database connection established');

const routes = new Routes(app);
routes.configure();

if (env.NODE_ENV === NODE_ENVIRONMENTS.development) {
    console.log('Available routes:');
    showRoutes(app);
}

const port = parseInt(env.PORT);
logger.info(`Server is running on port: ${port}, env: ${env.NODE_ENV}`);
const server = serve({ fetch: app.fetch, port });

process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received');

    logger.info('Closing http server');
    server.close(async () => {
        logger.info('Closing worker');
        await routes.shutDownWorker();

        logger.info('Closing database connection');
        await connection.end();

        logger.info('Exiting...');
        process.exit(0);
    });
});
