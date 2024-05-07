import { Hono } from "hono";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { UserRepository } from "../repository/user";
import { UserService } from "../service/user";
import { AuthController } from "./controller/auth";

export class Routes {
  private app: Hono;

  constructor(app: Hono) {
    this.app = app;
  }

  public configure() {
    // Status path
    this.app.get("/status", (c) => {
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

    // Setup repos
    const userRepo = new UserRepository();

    // Setup services
    const userService = new UserService(userRepo);

    // Setup controllers
    const authController = new AuthController(userService);

    // Register routes
    this.registerUserRoutes(api, authController);
  }

  private registerUserRoutes(api: Hono, authCtrl: AuthController) {
    const user = new Hono();

    user.get("/me", authCtrl.me);
    user.post("/login", authCtrl.login);
    user.post("/register", authCtrl.register);

    api.route("/user", user);
  }
}
