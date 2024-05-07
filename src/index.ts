import "dotenv/config";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { showRoutes } from "hono/dev";
import { logger as httpLogger } from "hono/logger";
import { trimTrailingSlash } from "hono/trailing-slash";

import { NODE_ENVIRONMENTS } from "./lib/constants";
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

if (process.env.NODE_ENV === NODE_ENVIRONMENTS.development) {
  console.log("Available routes:");
  showRoutes(app);
}

const port = parseInt(process.env.PORT!);
logger.info(`Server is running on port: ${port}, env: ${process.env.NODE_ENV}`);
serve({ fetch: app.fetch, port });
