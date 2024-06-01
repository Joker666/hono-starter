import { sign, verify } from 'hono/jwt';
import env from './env';

type JWTPayload = {
    [key: string]: unknown;
    exp?: number;
};

const encode = async (id: number, email: string) => {
    const payload: JWTPayload = {
        sub: id,
        email: email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // Token expires in 30 days
    };
    return await sign(payload, env.SECRET_KEY);
};

const check = async (token: string): Promise<JWTPayload> => {
    return await verify(token, env.SECRET_KEY);
};

export { JWTPayload, encode };
