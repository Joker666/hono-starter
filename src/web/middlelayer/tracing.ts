import { createMiddleware } from 'hono/factory';
import { TRACING } from '../../lib/constants';
import { randomString } from '../../util/string';

export const tracing = createMiddleware(async (c, next) => {
    c.set(TRACING, randomString(10));
    await next();
});
