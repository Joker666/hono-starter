import type { Context } from 'hono';
import type { StatusCode } from 'hono/utils/http-status';
import type { StatusCodes } from 'http-status-codes';

const serveData = (c: Context, data: any) => {
  return c.json({ data });
};

const serve = (c: Context, status: StatusCodes, data: any) => {
  return c.json({ data }, <StatusCode>status);
};

export { serve, serveData };
