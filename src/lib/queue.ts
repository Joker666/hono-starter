import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import env from './env';

const QUEUE = {
  default: 'default',
};

const TASK = {
  SendWelcomeEmail: 'SendWelcomeEmail',
};

const connection = new IORedis({
  port: parseInt(env.REDIS_PORT),
  host: env.REDIS_HOST,
  maxRetriesPerRequest: null,
});

// Reuse the ioredis instance
const defaultQueue = new Queue(QUEUE.default, { connection });

export { QUEUE, TASK, connection, defaultQueue };
