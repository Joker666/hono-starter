import { validator } from 'hono/validator';
import { z } from 'zod';
import { serveUnprocessableEntity } from '../resp/error';
import { getErrorPhrase } from './validator';

const userRegistrationValidator = validator('json', (value, c) => {
  const schema = z.object({
    name: z.string().min(4).max(40),
    email: z.string().email(),
    password: z.string().min(8).max(20),
  });
  const parsed = schema.safeParse(value);
  if (!parsed.success) {
    return serveUnprocessableEntity(c, getErrorPhrase(parsed.error));
  }
  return parsed.data;
});

export { userRegistrationValidator };
