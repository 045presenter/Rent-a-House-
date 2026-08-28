import logger from '../utils/logger.js';

export default function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  logger.error(error);

  return res.status(error.status || 500).json({
    error: error.message || 'Internal server error',
  });
}
