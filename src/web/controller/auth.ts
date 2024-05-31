import { Context } from 'hono';
import { DB_ERRORS, DatabaseError } from '../../lib/database';
import { verify } from '../../lib/encryption';
import { JWTPayload, encode } from '../../lib/jwt';
import { UserService } from '../../service/user';
import sendWelcomeEmailAsync from '../../task/client/sendWelcomeEmailAsync';
import { LoginBody, RegistrationBody } from '../validator/user';
import { ERRORS, serveBadRequest, serveInternalServerError, serveUnauthorized } from './resp/error';
import { serveData } from './resp/resp';
import { serializeUser } from './serializer/user';

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
            return serveInternalServerError(c, new Error(ERRORS.USER_NOT_FOUND));
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
            return serveInternalServerError(c, new Error(ERRORS.USER_NOT_FOUND));
        }

        const serializedUser = serializeUser(user);
        return serveData(c, { user: serializedUser });
    }
}
