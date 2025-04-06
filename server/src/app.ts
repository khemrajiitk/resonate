import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/ping', (req: Request, res: Response) => {
    res.send(`Pong ${new Date()}`);
});

// Global error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).send('');  // Return generic error message
});

export default app; // Export the app instance to be used in server.ts