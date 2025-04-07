import express from 'express';
import routes from './routes';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware';
import loggerMiddleware from './middlewares/logger.middleware';

const app = express();

app.use(loggerMiddleware);

// CORS configuration
const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5173',
            'https://ui-service-678554499597.asia-south1.run.app'
        ];
        const wildcardDomain = /\.xyz\.ai$/;

        if (!origin || allowedOrigins.includes(origin) || wildcardDomain.test(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions)); // Enable CORS with the specified options

app.use(express.json());

// Prefix all routes with /v1
app.use('/v1', routes);

// Global error handling middleware (must be after all routes)
app.use(errorHandler);

export default app;