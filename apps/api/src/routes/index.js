import { Router } from 'express';
import ecommerceRoutes from './ecommerce/index.js';

export default function routes() {
  const router = Router();

  router.use('/', ecommerceRoutes());

  return router;
}
