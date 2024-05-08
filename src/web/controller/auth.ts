import { Context } from "hono";
import { encode } from "../../lib/jwt";
import { UserService } from "../../service/user";

export class AuthController {
  private service: UserService;

  constructor(userService: UserService) {
    this.service = userService;

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.me = this.me.bind(this);
  }

  public login(c: Context) {
    return c.json("login");
  }

  public async register(c: Context) {
    const body = await c.req.json();
    await this.service.create(body.name, body.email, body.password);
    const user = await this.service.findByEmail(body.email);
    const token = await encode(user!.id, user!.email);
    return c.json({ user, token });
  }

  public me(c: Context) {
    return c.json("me");
  }
}
