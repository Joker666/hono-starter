import { Job, Worker } from 'bullmq';
import { logger } from '../lib/logger';
import { QUEUE, connection } from '../lib/queue';
import { UserService } from '../service/user';
import sendWelcomeEmail from './sendWelcomeEmail';

const TASK = {
    SendWelcomeEmail: 'SendWelcomeEmail',
};

class Tasker {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;

        this.setup = this.setup.bind(this);
        this.processor = this.processor.bind(this);
    }

    public setup() {
        const worker = new Worker(QUEUE.default, this.processor, { connection });

        worker.on('completed', (job: Job) => {
            logger.info(`Job ${job.id} completed, task name: ${job.name}`);
        });

        worker.on('failed', (job: Job | undefined, error: Error) => {
            if (job) {
                logger.error(`Job ${job.id} failed, task name: ${job.name}, error: ${error.message}`);
            } else {
                logger.error(`Job failed, error: ${error.message}`);
            }
        });

        worker.on('error', (err) => {
            logger.error(err);
        });

        return worker;
    }

    private async processor(job: Job) {
        switch (job.name) {
            case TASK.SendWelcomeEmail: {
                await sendWelcomeEmail(job.data, this.userService);
                break;
            }
        }
    }
}

export { TASK, Tasker };
