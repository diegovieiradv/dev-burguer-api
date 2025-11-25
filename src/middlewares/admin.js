const adminMiddleware = (request, response, next) => {
  const isUserAdmin = request.userIdIsAdmin;
  if (!isUserAdmin) {
    return response.status(401).json({ error: 'Não autorizado' });
  }
  return next();
};

export default adminMiddleware;
