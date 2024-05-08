import { ZodError } from 'zod';

const getErrorPhrase = (error: ZodError) => {
  const path = error.issues[0].path[0];
  const message = error.issues[0].message;
  return `${path}: ${message}`;
};

export { getErrorPhrase };
