import { Context } from 'hono';
import { StatusCode } from 'hono/utils/http-status';
import { StatusCodes } from 'http-status-codes';

const serveData = (c: Context, data: any) => {
    return c.json({ data });
};

const serve = (c: Context, status: StatusCodes, data: any) => {
    return c.json({ data }, <StatusCode>status);
};

export { serve, serveData };
