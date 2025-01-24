import { createMiddleware } from 'hono/factory';
import { TRACING } from '../../lib/constants.js';
import { randomString } from '../../util/string.js';

export const tracing = createMiddleware(async (c, next) => {
  c.set(TRACING, randomString(10));
  await next();
});
