import "dotenv/config";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { logger as httpLogger } from "hono/logger";
import { trimTrailingSlash } from "hono/trailing-slash";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { logger } from "./lib/logger";

const app = new Hono({ strict: true });

// Generic middlewares
app.use(cors());
app.use(compress());
app.use(httpLogger());
app.use(trimTrailingSlash());

// Status path
app.get("/", (c) => {
  return c.text("Ok");
});

// Universal catchall
app.notFound((c) => {
  return c.text(getReasonPhrase(StatusCodes.NOT_FOUND), StatusCodes.NOT_FOUND);
});

const port = parseInt(process.env.PORT!);
logger.info(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
