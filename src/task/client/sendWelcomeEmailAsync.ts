import { logger } from '../../lib/logger';
import { TASK, defaultQueue } from '../../lib/queue';

const sendWelcomeEmailAsync = async (userId: number) => {
  const job = await defaultQueue.add(TASK.send_welcome_email, { userId });
  logger.info(`Job ${job.id} added to queue. Task scheduled for ${TASK.send_welcome_email}, user: ${userId}`);
};

export default sendWelcomeEmailAsync;
