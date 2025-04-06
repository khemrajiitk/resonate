import { Router } from 'express';
import pingRoute from './ping.route';

const router = Router();

// Mount individual routes
router.use('/ping', pingRoute);

export default router;
