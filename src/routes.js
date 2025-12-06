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
import OrderController from './app/controllers/OrderController.js';

const routes = new Router();

// Upload
const uploads = multer({ storage: multerConfig.Storage });

// Rotas públicas
routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

// Rotas com login
routes.use(authMiddleware);

// PRODUCTS
routes.post(
  '/products',
  adminMiddleware,
  uploads.single('file'),
  ProductController.store,
);

routes.put(
  '/products/:id',
  adminMiddleware,
  uploads.single('file'),
  ProductController.update,
);

routes.get('/products', ProductController.index);

// CATEGORIES
routes.post(
  '/categories',
  adminMiddleware,
  uploads.single('file'),
  CategoryController.store,
);

routes.put(
  '/categories/:id',
  adminMiddleware,
  uploads.single('file'),
  CategoryController.update,
);
routes.get('/categories', CategoryController.index);

routes.post('/orders', adminMiddleware, OrderController.store);

export default routes;
