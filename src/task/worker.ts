import { Job, Worker } from 'bullmq';
import { QUEUE, TASK, connection } from '../lib/queue';
import sendWelcomeEmail from './sendWelcomeEmail';
import { logger } from '../lib/logger';

const worker = new Worker(
  QUEUE.default,
  async (job) => {
    switch (job.name) {
      case TASK.send_welcome_email: {
        await sendWelcomeEmail(job.data);
        break;
      }
    }
  },
  { connection },
);

worker.on('completed', (job: Job, returnvalue: any) => {
  logger.info(`Job completed ${job.id}, name: ${job.name}`);
});

worker.on('failed', (job: Job | undefined, error: Error, prev: string) => {
  if (job) {
    logger.error(`Job failed ${job.id}, name: ${job.name}, error: ${error.message}`);
  } else {
    logger.error(`Job failed, error: ${error.message}`);
  }
});

worker.on('error', err => {
  logger.error(err);
});

export { worker };
