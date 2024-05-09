import { logger } from '../lib/logger';

const sendWelcomeEmail = async (data: any) => {
  logger.info('Welcome email sent to', { user: data.userId });
};

export default sendWelcomeEmail;
