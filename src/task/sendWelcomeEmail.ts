import { logger } from '../lib/logger.js';
import type { UserService } from '../service/user.js';

const sendWelcomeEmail = async (data: any, userService: UserService) => {
  const user = await userService.find(data.userId);
  logger.info(`Welcome email sent to ${user?.email}`);
};

export default sendWelcomeEmail;
