import { Router } from 'express';
import healthCheck from './health-check.js';
import propertiesRouter from './properties.js';
import inquiriesRouter from './inquiries.js';
import subscriptionsRouter from './subscription.js';
import authMiddleware from '../../middleware/auth.js';

const router = Router();

export default () => {
    router.get('/health', healthCheck);
    router.use('/properties', propertiesRouter);
    router.use('/inquiries', authMiddleware, inquiriesRouter);
    router.use('/ecommerce/subscriptions', authMiddleware, subscriptionsRouter);

    return router;
};
