import { Router } from 'express';
import User from './app/models/User.js';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import multer from 'multer';
import multerConfig from './config/multer.cjs';
import authMiddleware from './middlewares/auth.js';
import CategoryController from './app/controllers/CategoryController.js';
import adminMiddleware from './middlewares/admin.js';

const routes = new Router();

// CORREÇÃO AQUI ↓↓↓
const uploads = multer({ storage: multerConfig.Storage });

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

// CORRETO: 'file' é o nome do campo no Insomnia
routes.use(authMiddleware);
routes.post(
  '/products',
  adminMiddleware,
  uploads.single('file'),
  ProductController.store,
);
routes.get('/products', ProductController.index);

routes.post('/categories', adminMiddleware, CategoryController.store);
routes.get('/categories', CategoryController.index);

export default routes;
