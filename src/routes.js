import { Router } from 'express';
import User from './app/models/User.js';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import multer from 'multer';
import multerConfig from './config/multer.cjs';

const routes = new Router();

// CORREÇÃO AQUI ↓↓↓
const uploads = multer({ storage: multerConfig.Storage });

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

// CORRETO: 'file' é o nome do campo no Insomnia
routes.post('/products', uploads.single('file'), ProductController.store);
routes.get('/products',ProductController.index )

export default routes;
