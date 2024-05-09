import { Context } from 'hono';
import { StatusCode } from 'hono/utils/http-status';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

const serveNotFound = (c: Context) => {
    return c.json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) }, <StatusCode>StatusCodes.NOT_FOUND);
};

const serveBadRequest = (c: Context, message: string) => {
    return c.json({ error: message }, <StatusCode>StatusCodes.BAD_REQUEST);
};

const serveUnprocessableEntity = (c: Context, message: string) => {
    return c.json({ error: message }, <StatusCode>StatusCodes.UNPROCESSABLE_ENTITY);
};

const serveUnauthorized = (c: Context) => {
    return c.json({ error: getReasonPhrase(StatusCodes.UNAUTHORIZED) }, <StatusCode>StatusCodes.UNAUTHORIZED);
};

const serveInternalServerError = (c: Context, error: any) => {
    return c.json({ error: error }, <StatusCode>StatusCodes.INTERNAL_SERVER_ERROR);
};

const serveError = (c: Context, status: StatusCodes, message: string) => {
    return c.json({ error: message }, <StatusCode>status);
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
