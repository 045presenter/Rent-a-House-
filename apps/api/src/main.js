// apps/api/src/main.js
// Tolerant dotenv loading (optional). Does not throw if dotenv or .env is missing.
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from './routes/index.js';
import errorMiddleware from './middleware/error.js';
import globalRateLimit from './middleware/global-rate-limit.js';
import logger from './utils/logger.js';
import { BodyLimit } from './constants/common.js';

// Try to load dotenv (non-blocking). Works in ESM; failure is ignored.
import('dotenv')
  .then((mod) => {
    try { mod.config(); }
    catch (e) { /* ignore */ }
  })
  .catch(() => {
    // dotenv not available or failed to import — ignore in production
  });

const app = express();

// Trust proxy (Render sets X-Forwarded-For); only enable if you are behind a proxy
app.set('trust proxy', true);

// Basic process-level error handlers (log and continue/fail gracefully)
process.on('uncaughtException', (err) => {
  try { logger.error('Uncaught exception: ', err); } catch (e) { console.error(err); }
  // optional: process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  try { logger.error('Unhandled Rejection: ', reason); } catch (e) { console.error(reason); }
});

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || true,
  credentials: true
}));
app.use(morgan('combined'));
app.use(globalRateLimit());
app.use(express.json({ limit: BodyLimit }));

// Routes
app.use('/', routes);

// Error handler (ensure this is after routes)
if (typeof errorMiddleware === 'function') {
  app.use(errorMiddleware);
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Bind to Render port or fallback for local testing
const port = parseInt(process.env.PORT, 10) || 3001;
app.listen(port, () => {
  try { logger.info(`API Server listening on port ${port}`); } catch (e) { console.log(`API Server listening on port ${port}`); }
  // Helpful console.log for Render build logs visibility
  console.log(`API Server running on http://localhost:${port}`);
});

export default app;
