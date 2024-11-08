import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import { databaseExecute } from '../database/database.js';

export const emailExistsSVC = async email => {
  const emailExists = 'SELECT userId FROM users WHERE email = ?';

  const results = await databaseExecute(emailExists, [email]);

  if (results.length == 0) return false;

  return true;
};

export const registerClientSVC = async (name, surname, email, date, password) => {
  const userId = v4();

  const registerClient =
    'INSERT INTO users (userId, name, surname, email, date, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)';

  const results = await databaseExecute(registerClient, [
    userId,
    name,
    surname,
    email,
    date,
    password,
    'client',
  ]);

  if (!results) return 500;
};

export const registerBusinessSVC = async (name, email, pfp, description, password) => {
  const userId = v4();

  const registerBusiness =
    'INSERT INTO users (userId, name, email, pfp, description, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)';

  const results = await databaseExecute(registerBusiness, [
    userId,
    name,
    email,
    pfp,
    description,
    password,
    'business',
  ]);

  if (!results) return 500;
};
