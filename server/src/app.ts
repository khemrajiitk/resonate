import express from 'express';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(express.json());

// Prefix all routes with /v1
app.use('/v1', routes);

// Global error handling middleware (must be after all routes)
app.use(errorHandler);

export default app;