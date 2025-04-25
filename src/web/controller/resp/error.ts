import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

const serveNotFound = (c: Context, message?: string) => {
  return c.json(
    { error: message || getReasonPhrase(StatusCodes.NOT_FOUND) },
    <ContentfulStatusCode>StatusCodes.NOT_FOUND,
  );
};
const serveBadRequest = (c: Context, message: string) => {
  return c.json({ error: message }, <ContentfulStatusCode>StatusCodes.BAD_REQUEST);
};

const serveUnprocessableEntity = (c: Context, message: string) => {
  return c.json({ error: message }, <ContentfulStatusCode>StatusCodes.UNPROCESSABLE_ENTITY);
};

const serveUnauthorized = (c: Context) => {
  return c.json({ error: getReasonPhrase(StatusCodes.UNAUTHORIZED) }, <ContentfulStatusCode>StatusCodes.UNAUTHORIZED);
};

const serveInternalServerError = (c: Context, error: any) => {
  if (error instanceof HTTPException) {
    return c.json({ error: error.message }, <ContentfulStatusCode>error.status);
  }

  return c.json({ error: error }, <ContentfulStatusCode>StatusCodes.INTERNAL_SERVER_ERROR);
};

const serveError = (c: Context, status: StatusCodes, message: string) => {
  return c.json({ error: message }, <ContentfulStatusCode>status);
};

const ERRORS = {
  USER_EXISTS: 'User already exists',
  USER_NOT_FOUND: 'User not found',
};

export {
  ERRORS,
  serveBadRequest,
  serveError,
  serveInternalServerError,
  serveNotFound,
  serveUnauthorized,
  serveUnprocessableEntity,
};
