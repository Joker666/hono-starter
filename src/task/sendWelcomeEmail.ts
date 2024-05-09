import { logger } from '../lib/logger';

const sendWelcomeEmail = async (data: any) => {
  logger.info(`Welcome email sent to ${data.userId}`);
};

export default sendWelcomeEmail;
