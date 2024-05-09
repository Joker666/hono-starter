import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import env from '../lib/env';
import { UserRepository } from '../repository/user';
import { UserService } from '../service/user';
import { AuthController } from './controller/auth';
import { serveInternalServerError, serveNotFound } from './controller/resp/error';
import { loginValidator, registrationValidator } from './middlelayer/validator/user';

export class Routes {
    private app: Hono;

    constructor(app: Hono) {
        this.app = app;
    }

    public configure() {
        // Index path
        this.app.get('/', (c) => {
            return c.text('Ok');
        });

        // Universal catchall
        this.app.notFound((c) => {
            return serveNotFound(c);
        });

        // Error handling
        this.app.onError((err, c) => {
            return serveInternalServerError(c, err);
        });

        const api = this.app.basePath('/v1');

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
        const authCheck = jwt({ secret: env.SECRET_KEY });

        user.get('/me', authCheck, authCtrl.me);
        user.post('/login', loginValidator, authCtrl.login);
        user.post('/register', registrationValidator, authCtrl.register);

        api.route('/user', user);
    }
}
