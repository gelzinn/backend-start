import jwt from 'jsonwebtoken'

import { createRefreshToken } from './createRefreshToken';
import { secret } from "../config/secret";

export function generateJwtAndRefreshToken(username: string, payload: object = {}) {
  const token = jwt.sign(payload, secret, {
    subject: username,
    expiresIn: 10, // 10 sec
  });

  const refreshToken = createRefreshToken(username)

  return {
    token,
    refreshToken,
  }
}
