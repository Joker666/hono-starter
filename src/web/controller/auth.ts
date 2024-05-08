import { Context } from 'hono';
import { verify } from '../../lib/encryption';
import { encode } from '../../lib/jwt';
import { UserService } from '../../service/user';
import { serveUnauthorized } from './resp/error';
import { serveData } from './resp/resp';

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
    if (!user) {
      return serveUnauthorized(c);
    }
    const isVerified = verify(body.password, user.password);
    if (!isVerified) {
      return serveUnauthorized(c);
    }
    const token = await encode(user.id, user.email);
    return serveData(c, { user, token });
  }

  public async register(c: Context) {
    const body = await c.req.json();
    await this.service.create(body.name, body.email, body.password);
    const user = await this.service.findByEmail(body.email);
    const token = await encode(user!.id, user!.email);
    return serveData(c, { user, token });
  }

  public async me(c: Context) {
    const payload: JWTPayload = c.get('jwtPayload');
    const user = await this.service.findByEmail(payload.email);
    return serveData(c, user);
  }
}
