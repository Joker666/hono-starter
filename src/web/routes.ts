import { Hono } from "hono";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

export class Routes {
  private app: Hono;

  constructor(app: Hono) {
    this.app = app;
  }

  public configure() {
    // Status path
    this.app.get("/", (c) => {
      return c.text("Ok");
    });

    // Universal catchall
    this.app.notFound((c) => {
      return c.text(
        getReasonPhrase(StatusCodes.NOT_FOUND),
        StatusCodes.NOT_FOUND
      );
    });

    const api = this.app.basePath("/v1");
  }
}
