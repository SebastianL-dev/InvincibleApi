import express, { Application } from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

const app: Application = express();
const prefix = '/api/v0';

app.use(cors({ origin: '*' }), express.json(), logger('dev'), helmet(), compression());

export default app;
