import { v4 as uuid } from 'uuid'

// Utilizando do token instanciado na database
import { tokens } from "../database";

export function createRefreshToken(username: string) {
  const currentUserTokens = tokens.get(username) ?? []
  const refreshToken = uuid()

  tokens.set(username, [...currentUserTokens, refreshToken])

  return refreshToken;
}