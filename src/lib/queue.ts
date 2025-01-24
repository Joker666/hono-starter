import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import env from './env.js';

const QUEUE = {
  default: 'default',
};

const connection = new IORedis.default({
  port: Number.parseInt(env.REDIS_PORT),
  host: env.REDIS_HOST,
  maxRetriesPerRequest: null,
});
// Reuse the ioredis instance
const defaultQueue = new Queue(QUEUE.default, {
  connection,
  defaultJobOptions: {
    removeOnComplete: {
      count: 1000, // keep up to 1000 jobs
      age: 24 * 3600, // keep up to 24 hours
    },
    removeOnFail: {
      age: 24 * 3600, // keep up to 24 hours
    },
  },
});

export { connection, defaultQueue, QUEUE };
