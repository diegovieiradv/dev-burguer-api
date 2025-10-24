import { Router } from 'express';
import User from './app/models/User.js';
import { v4 } from 'uuid';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = {
    id: v4(),
    name: 'John Doe',
    email: 'john@gmail.com',
    password: '12345', // deve ser igual ao campo do model
    admin: false, // ajuste se o model tiver esse campo
  };

  const newUser = await User.create(user);

  res.status(201).json(newUser);
});

export default routes;
