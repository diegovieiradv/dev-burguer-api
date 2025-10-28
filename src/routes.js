import { Router } from 'express';
import User from './app/models/User.js';
import UserController from './app/controllers/UserController.js';

const routes = new Router();

routes.get('/', UserController.store);

export default routes;
