import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

export const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);

    app.use(errorHandler);

  return app;
}