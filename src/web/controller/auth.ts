import type { Context } from 'hono';
import { DB_ERRORS, type DatabaseError } from '../../db/database.js';
import { verify } from '../../lib/encryption.js';
import { type JWTPayload, encode } from '../../lib/jwt.js';
import type { UserService } from '../../service/user.js';
import sendWelcomeEmailAsync from '../../task/client/sendWelcomeEmailAsync.js';
import type { LoginBody, RegistrationBody } from '../validator/user.js';
import { ERRORS, serveBadRequest, serveInternalServerError, serveNotFound, serveUnauthorized } from './resp/error.js';
import { serveData } from './resp/resp.js';
import { serializeUser } from './serializer/user.js';

export class AuthController {
  private service: UserService;

  constructor(userService: UserService) {
    this.service = userService;

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.me = this.me.bind(this);
  }

  public async login(c: Context) {
    const body: LoginBody = await c.req.json();
    const user = await this.service.findByEmail(body.email);
    if (!user) {
      return serveUnauthorized(c);
    }
    const isVerified = verify(body.password, user.password);
    if (!isVerified) {
      return serveUnauthorized(c);
    }

    const token = await encode(user.id, user.email);
    const serializedUser = serializeUser(user);
    return serveData(c, { token, user: serializedUser });
  }

  public async register(c: Context) {
    const body: RegistrationBody = await c.req.json();
    try {
      await this.service.create(body.name, body.email, body.password);
    } catch (err) {
      const e = err as DatabaseError;
      if (e.code === DB_ERRORS.DUPLICATE_KEY) {
        return serveBadRequest(c, ERRORS.USER_EXISTS);
      }
      return serveInternalServerError(c, err);
    }
    const user = await this.service.findByEmail(body.email);
    if (!user) {
      return serveNotFound(c, ERRORS.USER_NOT_FOUND);
    }

    await sendWelcomeEmailAsync(user.id);

    const token = await encode(user.id, user.email);
    const serializedUser = serializeUser(user);
    return serveData(c, { token, user: serializedUser });
  }

  public async me(c: Context) {
    const payload: JWTPayload = c.get('jwtPayload');
    const user = await this.service.findByEmail(payload.email as string);
    if (!user) {
      return serveNotFound(c, ERRORS.USER_NOT_FOUND);
    }

    const serializedUser = serializeUser(user);
    return serveData(c, { user: serializedUser });
  }
}
