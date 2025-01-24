import crypto from 'crypto';
import env from './env.js';

const encrypt = (text: string): string => {
  // Generate a random initialization vector (IV)
  const iv = crypto.randomBytes(16);

  // Derive a 256-bit key from the password using SHA-256 hashing
  const key = crypto.createHash('sha256').update(env.SECRET_KEY).digest('base64').slice(0, 32);

  // Create a cipher using AES-256-CBC algorithm
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  // Encrypt the plaintext
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Return the encrypted text along with the IV
  return `${iv.toString('hex')}:${encrypted}`;
};

const decrypt = (encryptedText: string): string => {
  // Split the encrypted text into the IV and the ciphertext
  const [ivHex, ciphertext] = encryptedText.split(':');

  // Convert the hexadecimal IV to a Buffer
  const iv = Buffer.from(ivHex, 'hex');

  // Derive the 256-bit key from the password using SHA-256 hashing
  const key = crypto.createHash('sha256').update(env.SECRET_KEY).digest('base64').slice(0, 32);

  // Create a decipher using AES-256-CBC algorithm
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  // Decrypt the ciphertext
  let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

const verify = (text: string, encryptedText: string): boolean => {
  return text === decrypt(encryptedText);
};

export { encrypt, verify };
