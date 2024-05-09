import env from './lib/env';

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { cors } from 'hono/cors';
import { showRoutes } from 'hono/dev';
import { logger as httpLogger } from 'hono/logger';
import { trimTrailingSlash } from 'hono/trailing-slash';

import { NODE_ENVIRONMENTS } from './lib/constants';
import { logger } from './lib/logger';
import { worker } from './task/worker';
import { tracing } from './web/middlelayer/tracing';
import { Routes } from './web/routes';

const app = new Hono();

// Generic middlewares
app.use(cors());
app.use(tracing);
app.use(compress());
app.use(httpLogger());
app.use(trimTrailingSlash());

const routes = new Routes(app);
routes.configure();

if (env.NODE_ENV === NODE_ENVIRONMENTS.development) {
    console.log('Available routes:');
    showRoutes(app);
}

// Import worker to make sure it's running
if (worker.isRunning()) {
    logger.info('Worker is running');
}

const port = parseInt(env.PORT);
logger.info(`Server is running on port: ${port}, env: ${env.NODE_ENV}`);
serve({ fetch: app.fetch, port });
