import pino from "pino";
import env from "./env.js";

const logger = pino.pino({
  level: env.LOG_LEVEL || "info",
});
export { logger };
