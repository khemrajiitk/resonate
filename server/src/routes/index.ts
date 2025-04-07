import { Router } from 'express';
import pingRoute from './ping.route';
import authRoute from './auth.route';
import slotRoute from './slot.route';
import appointmentRoute from './appointment.route';
import chatRoute from './chat.route';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Mount individual routes
router.use('/ping', pingRoute);
router.use('/auth', authRoute);
router.use('/slots', authenticate, slotRoute);
router.use('/appointments', authenticate, appointmentRoute);
router.use('/chats', authenticate, chatRoute);

export default router;
