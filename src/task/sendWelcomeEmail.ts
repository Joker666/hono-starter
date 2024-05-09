import { logger } from '../lib/logger';
import { UserService } from '../service/user';

const sendWelcomeEmail = async (data: any, userService: UserService) => {
    const user = await userService.find(data.userId);
    logger.info(`Welcome email sent to ${user?.email}`);
};

export default sendWelcomeEmail;
