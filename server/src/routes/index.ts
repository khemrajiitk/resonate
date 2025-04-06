import { Router } from 'express';
import pingRoute from './ping.route';
import authRoute from './auth.route';

const router = Router();

// Mount individual routes
router.use('/ping', pingRoute);
router.use('/auth', authRoute);

export default router;
