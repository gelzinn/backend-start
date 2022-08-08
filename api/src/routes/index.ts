import { Router } from "express";

import { seedUserStore, users, seedTeamStore, teams } from "../database";
import { ensureAuthenticateUser } from "../middlewares/ensureAuthenticateUser";
import { addUserToRequest } from "../middlewares/addUserToRequest";
import { generateJwtAndRefreshToken } from "../services/generateTokenAndRefreshToken";
import { CreateSessionDTO } from "../@types";
import { invalidateRefreshToken } from "../services/invalidateRefreshToken";
import { checkRefreshTokenIsValid } from "../services/checkRefreshTokenIsValid";

const router = Router();

seedUserStore();
seedTeamStore();

// Cria uma sessão para o usuário
router.post('/auth/session', (request, response) => {
  const { username, password } = request.body as CreateSessionDTO;

  const user = users.get(username);

  if (!user || password !== user.password) {
    return response
      .status(401)
      .json({
        error: true,
        message: 'E-mail or password incorrect.'
      });
  }

  const { token, refreshToken } = generateJwtAndRefreshToken(username, {
    id: user.id,
    roles: user.roles,
  })

  return response.json({
    token,
    refreshToken,
    id: user.id,
    roles: user.roles,
  });
});

/* Caso o token tenha expirado, o usuário fará uma chamada a essa rota para 
  renovar o token e o refresh token
*/
router.post('/auth/refresh', addUserToRequest, (request, response) => {
  const username = request.user;
  const { refreshToken } = request.body;

  const user = users.get(username);

  if (!user) {
    return response
      .status(401)
      .json({
        error: true,
        message: 'User not found.'
      });
  }

  if (!refreshToken) {
    return response
      .status(401)
      .json({ error: true, message: 'Refresh token is required.' });
  }

  const isValidRefreshToken = checkRefreshTokenIsValid(username, refreshToken)

  if (!isValidRefreshToken) {
    return response
      .status(401)
      .json({ error: true, message: 'Refresh token is invalid.' });
  }

  invalidateRefreshToken(username, refreshToken)

  const { token, refreshToken: newRefreshToken } = generateJwtAndRefreshToken(username, {
    id: user.id,
    roles: user.roles,
  })

  return response.json({
    token,
    refreshToken: newRefreshToken,
    id: user.id,
    roles: user.roles,
  });
});

// Rota simples que retorna as informações do usuário logado
router.get('/me', ensureAuthenticateUser, (request, response) => {
  const username = request.user;

  const user = users.get(username);

  if (!user) {
    return response
      .status(400)
      .json({ error: true, message: 'User not found.' });
  }

  return response.json({
    username,
    id: user.id,
    roles: user.roles,
  })
});

// Retorna as informações de todos os times
router.get("/teams", ensureAuthenticateUser, (request, response) => {
  const username = request.user;

  const user = users.get(username);

  if (!user) {
    return response
      .status(402)
      .json({ error: true, message: 'User unauthorized.' });
  }

  return response.json({
    teams,
  });
});

export default router;
