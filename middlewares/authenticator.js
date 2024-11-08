import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = jwtData => {
  return jwt.sign(jwtData, process.env.API_KEY, { expiresIn: '2h' });
};

export const validateToken = (req, res, next) => {
  const accessToken = req.cookies.auth || null; //Si no encuentra .auth, el token es nulo "rechaza"

  if (!accessToken) return res.status(401).send('Access denied');
  else {
    jwt.verify(accessToken, process.env.API_KEY, (err, jwtData) => {
      if (err) {
        return res.status(401).send('Access Denied. Token Expirado o Incorrecto');
      } else {
        res.locals.userData = { userId: jwtData.userId, role: jwtData.role };

        next();
      }
    });
  }
};
