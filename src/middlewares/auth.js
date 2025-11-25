import jwt from 'jsonwebtoken';
import authConfig from '../../src/config/auth.js';

const authMiddleware = (request, response, next) => {
  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.status(401).json({ error: 'Token não fornecido' });
  }
  const token = authToken.split(' ')[1];

  try {
    jwt.verify(token, authConfig.secret, (error, decoded) => {
      if (error) {
        throw Error();
      }

      request.userId = decoded.id;
      request.userIdIsAdmin = decoded.admin;
    });
  } catch (error) {
    return response.status(401).json({ error: 'Token inválido' });
  }
  return next();
};

export default authMiddleware;
