import express, { Application } from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import LocationRouter from './routes/location.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app: Application = express();
const prefix = '/api/v0';

app.use(cors({ origin: '*' }), express.json(), logger('dev'), helmet(), compression());

app.use(prefix, LocationRouter);

app.use(errorMiddleware);

export default app;
