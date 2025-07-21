import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import pino from 'pino-http';
import path from 'node:path';
import { config } from './config/index.js';
import { container } from './container.js';
import { scopePerRequest } from 'awilix-express';
import swaggerUi from 'swagger-ui-express';
import {generateSpecs} from './docs/index.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { router as usersRouter } from './routes/routes.js';
import { router as uploadsRouter } from './routes/routes.js';
// import {upload} from "./libs/multer.js";
// import {attachStaticHandler} from "./static/attach-static-handler.js";

// const uploadDir = path.resolve('uploads');

export function createApp() {
  const app = express();


  app.use(helmet());

  app.use(cors());

  
  app.use(compression());

  
  app.use(rateLimit({
    windowMs: 60_000,
    max: 100,
    standardHeaders: true,   
    legacyHeaders: false
  }));

  app.use(morgan('dev'));

  app.use(pino());

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(scopePerRequest(container));

  app.use('/api', uploadsRouter(upload, uploadDir));

  attachStaticHandler(app)

  if (config.env === 'development') {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(generateSpecs()));
    console.log(`Swagger docs → ${config.baseUrl}/docs`);
  }

  app.use('/api', usersRouter);

  app.use(notFound);

  app.use(errorHandler);

  return app;
}