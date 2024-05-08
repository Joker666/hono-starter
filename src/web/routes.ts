import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import { UserRepository } from '../repository/user';
import { UserService } from '../service/user';
import { AuthController } from './controller/auth';
import { serveNotFound } from './controller/resp/error';

export class Routes {
  private app: Hono;

  constructor(app: Hono) {
    this.app = app;
  }

  public configure() {
    // Status path
    this.app.get('/status', (c) => {
      return c.text('Ok');
    });

    // Universal catchall
    this.app.notFound((c) => {
      return serveNotFound(c);
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
    const authCheck = jwt({ secret: process.env.SECRET_KEY! });

    user.get('/me', authCheck, authCtrl.me);
    user.post('/login', authCtrl.login);
    user.post('/register', authCtrl.register);

    api.route('/user', user);
  }
}
