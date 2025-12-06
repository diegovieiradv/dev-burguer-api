const adminMiddleware = (request, response, next) => {
  // Pega do request o usuário setado no auth.js
  const isUserAdmin = request.user?.admin; // se você armazenou o user completo
  // ou se armazenou só o id:
  // const isUserAdmin = request.userIsAdmin;

  if (!isUserAdmin) {
    return response.status(401).json({ error: 'Não autorizado' });
  }

  return next();
};

export default adminMiddleware;
