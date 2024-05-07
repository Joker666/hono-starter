import { Context } from "hono";
import { UserService } from "../../service/user";

export class AuthController {
  private service: UserService;

  constructor(userService: UserService) {
    this.service = userService;
  }

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
