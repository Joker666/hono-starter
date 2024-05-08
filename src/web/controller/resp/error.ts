import { Context } from 'hono';
import { StatusCode } from 'hono/utils/http-status';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

const serveNotFound = (c: Context) => {
  return c.json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) }, <StatusCode>StatusCodes.NOT_FOUND);
};

const serveUnauthorized = (c: Context) => {
  return c.json({ error: getReasonPhrase(StatusCodes.UNAUTHORIZED) }, <StatusCode>StatusCodes.UNAUTHORIZED);
};

const serveInternalServerError = (c: Context) => {
  return c.json(
    { error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) },
    <StatusCode>StatusCodes.INTERNAL_SERVER_ERROR,
  );
};

const serveError = (c: Context, status: StatusCodes, message: string) => {
  return c.json({ error: message }, <StatusCode>status);
};

export { serveError, serveInternalServerError, serveNotFound, serveUnauthorized };
