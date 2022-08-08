// Utilizando do token instanciado na database
import { tokens } from "../database"

export function checkRefreshTokenIsValid(username: string, refreshToken: string) {
  const storedRefreshTokens = tokens.get(username) ?? []

  return storedRefreshTokens.some(token => token === refreshToken)
}