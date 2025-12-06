import jwt from 'jsonwebtoken';
import authConfig from '../../src/config/auth.js';

const authMiddleware = (request, response, next) => {
  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.status(401).json({ error: 'Token não fornecido' });
  }
  const token = authToken.split(' ')[1];

  try {
    const decoded = jwt.verify(token, authConfig.secret);

    request.userId = decoded.id;
    request.userName = decoded.name;
    request.userIdIsAdmin = decoded.admin;

    return next();
  } catch (error) {
    return response.status(401).json({ error: 'Token inválido' });
  }
};

export default authMiddleware;
