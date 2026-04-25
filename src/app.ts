import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { errorMiddleware } from './middlewares/error.middleware.js';
import LocationRouter from './routes/location.routes.js';
import SpeciesRouter from './routes/species.route.js';

const app: Application = express();
const prefix = '/api/v0';

app.use(cors({ origin: '*' }), express.json(), morgan('dev'), helmet(), compression());

app.use(prefix, LocationRouter);
app.use(prefix, SpeciesRouter);

app.use(errorMiddleware);

export default app;
