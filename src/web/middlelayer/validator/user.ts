import { validator } from 'hono/validator';
import { z } from 'zod';
import { validateSchema } from './validator';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
});

const loginValidator = validator('json', (value, c) => {
    return validateSchema(c, loginSchema, value);
});

const registrationSchema = loginSchema.extend({
    name: z.string().min(4).max(40),
});

const registrationValidator = validator('json', (value, c) => {
    return validateSchema(c, registrationSchema, value);
});

type LoginBody = z.infer<typeof loginSchema>;
type RegistrationBody = z.infer<typeof registrationSchema>;

export { LoginBody, RegistrationBody, loginValidator, registrationValidator };
