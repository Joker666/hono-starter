import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { verify } from '../../lib/encryption';
import { encode } from '../../lib/jwt';
import { UserService } from '../../service/user';

export class AuthController {
  private service: UserService;

  constructor(userService: UserService) {
    this.service = userService;

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.me = this.me.bind(this);
  }

  public async login(c: Context) {
    const body = await c.req.json();
    const user = await this.service.findByEmail(body.email);
    const isVerified = verify(body.password, user!.password);
    if (!isVerified)
      throw new HTTPException(StatusCodes.UNAUTHORIZED, {
        message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
      });
    const token = await encode(user!.id, user!.email);
    return c.json({ user, token });
  }

  public async register(c: Context) {
    const body = await c.req.json();
    await this.service.create(body.name, body.email, body.password);
    const user = await this.service.findByEmail(body.email);
    const token = await encode(user!.id, user!.email);
    return c.json({ user, token });
  }

  public async me(c: Context) {
    const payload: JWTPayload = c.get('jwtPayload');
    const user = await this.service.findByEmail(payload.email);
    return c.json(user);
  }
}
