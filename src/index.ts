import "dotenv/config";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { logger as httpLogger } from "hono/logger";
import { trimTrailingSlash } from "hono/trailing-slash";

import { logger } from "./lib/logger";
import { Routes } from "./web/routes";

const app = new Hono({ strict: true });

// Generic middlewares
app.use(cors());
app.use(compress());
app.use(httpLogger());
app.use(trimTrailingSlash());

const routes = new Routes(app);
routes.configure();

const port = parseInt(process.env.PORT!);
logger.info(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
