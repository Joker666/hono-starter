import { Context } from "hono";

export class AuthController {
  constructor() {}

  public login(c: Context) {
    return c.json("login");
  }

  public register(c: Context) {
    return c.json("register");
  }

  public me(c: Context) {
    return c.json("me");
  }
}
