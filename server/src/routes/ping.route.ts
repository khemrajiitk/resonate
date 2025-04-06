import { Router } from 'express';

const router = Router();

/**
 * @route   GET /api/ping
 * @desc    Health check route with timestamp
 * @access  Public
 */
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'pong 🏓',
    timestamp: new Date().toISOString(),
  });
});

export default router;
