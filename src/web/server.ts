import { serveStatic } from '@hono/node-server/serve-static';
import { swaggerUI } from '@hono/swagger-ui';
import { Worker } from 'bullmq';
import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import env from '../lib/env';
import { logger } from '../lib/logger';
import { connection } from '../lib/queue';
import { UserRepository } from '../repository/user';
import { UserService } from '../service/user';
import { Tasker } from '../task/tasker';
import { AuthController } from './controller/auth';
import { serveInternalServerError, serveNotFound } from './controller/resp/error';
import { loginValidator, registrationValidator } from './validator/user';

export class Server {
    private app: Hono;
    private worker?: Worker;

    constructor(app: Hono) {
        this.app = app;
    }

    public configure() {
        // Index path
        this.app.get('/', (c) => {
            return c.text('Ok');
        });

        // Static files
        this.app.use('/static/*', serveStatic({ root: './' }));

        // API Doc
        this.app.get('/doc', swaggerUI({ url: '/static/openapi.yaml' }));

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

        // Setup worker
        this.registerWorker(userService);

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

    private registerWorker(userService: UserService) {
        const tasker = new Tasker(userService);
        const worker = tasker.setup();
        if (worker.isRunning()) {
            logger.info('Worker is running');
        }
        this.worker = worker;
    }

    public async shutDownWorker() {
        await this.worker?.close();
        await connection.quit();
    }
}
