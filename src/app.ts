import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';
import HomeRouter from './routes/home.routes.js';
import LocationRouter from './routes/location.routes.js';
import SpeciesRouter from './routes/species.route.js';
import CharacterRouter from './routes/character.routes.js';
import GroupRouter from './routes/group.routes.js';
import EpisodeRouter from './routes/episode.routes.js';

const app: Application = express();
const prefix = '/api/v0';

app.use(cors({ origin: '*' }), express.json(), morgan('dev'), helmet(), compression());

app.use(prefix, HomeRouter);
app.use(prefix, LocationRouter);
app.use(prefix, SpeciesRouter);
app.use(prefix, CharacterRouter);
app.use(prefix, GroupRouter);
app.use(prefix, EpisodeRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
