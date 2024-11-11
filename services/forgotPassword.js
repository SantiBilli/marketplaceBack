import { databaseExecute } from '../database/database.js';

export const forgotPasswordSVC = async email => {
  const consulta = 'SELECT userId FROM users WHERE email = ?';

  const results = await databaseExecute(consulta, [email]);

  if (results.length == 0) return 404;
  if (!results) return 500;

  return true;
};

export const userTokenSVC = async (email, token, expireToken) => {
  const consulta = 'UPDATE users SET reset_token = ?, token_expire = ? WHERE email = ?';
  const results = await databaseExecute(consulta, [token, expireToken, email]);

  if (!results) return 500;

  return true;
};

export const obtainTokenUserSVC = async token => {
  const consulta = 'SELECT userId, token_expire FROM users WHERE reset_token = ?';
  const results = await databaseExecute(consulta, [token]);

  if (results.length == 0) return 498;
  if (!results) return 500;

  return results[0];
};

export const updatePasswordSVC = async (userId, password) => {
  const consulta = 'UPDATE users SET password = ?, reset_token = NULL, token_expire = NULL WHERE userId = ?';

  const results = await databaseExecute(consulta, [password, userId]);

  if (!results) return 500;

  return true;
};
