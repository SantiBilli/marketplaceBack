import bcrypt from 'bcrypt';
import { obtainPassword } from '../services/login.js';

export const loginCTL = async (req, res, next) => {
  const bodyParams = req.body;

  const userData = await obtainPassword(bodyParams.email);

  if (userData == 500) return res.status(500).send(); //500 Internal Server Error

  if (userData == 401) return res.status(401).send(); //401 Unauthorized

  const match = await bcrypt.compare(bodyParams.password, userData.password);

  if (!match) return res.status(401).send(); //401 Unauthorized

  res.locals.userData = {
    userId: userData.userId,
    role: userData.role,
  };

  res.locals.response = {
    data: {
      userId: userData.userId,
      role: userData.role,
    },
  };

  res.status(201);

  next();
};
