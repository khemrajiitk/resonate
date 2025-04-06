import { Router } from 'express';
import pingRoute from './ping.route';
import authRoute from './auth.route';
import slotRoute from './slot.route';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Mount individual routes
router.use('/ping', pingRoute);
router.use('/auth', authRoute);
router.use('/slots', authenticate, slotRoute);

export default router;
