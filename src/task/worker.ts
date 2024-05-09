import { Job, Worker } from 'bullmq';
import { logger } from '../lib/logger';
import { QUEUE, TASK, connection } from '../lib/queue';
import sendWelcomeEmail from './sendWelcomeEmail';

const worker = new Worker(
    QUEUE.default,
    async (job) => {
        switch (job.name) {
            case TASK.SendWelcomeEmail: {
                await sendWelcomeEmail(job.data);
                break;
            }
        }
    },
    { connection },
);

worker.on('completed', (job: Job) => {
    logger.info(`Job ${job.id} completed, name: ${job.name}`);
});

worker.on('failed', (job: Job | undefined, error: Error) => {
    if (job) {
        logger.error(`Job ${job.id} failed, name: ${job.name}, error: ${error.message}`);
    } else {
        logger.error(`Job failed, error: ${error.message}`);
    }
});

worker.on('error', (err) => {
    logger.error(err);
});

export { worker };
