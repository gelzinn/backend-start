// Utilizando do token instanciado na database
import { tokens } from "../database";

export function invalidateRefreshToken(username: string, refreshToken: string) {
  const storedRefreshTokens = tokens.get(username) ?? []

  tokens.set(username, storedRefreshTokens.filter(token => token !== refreshToken));
}