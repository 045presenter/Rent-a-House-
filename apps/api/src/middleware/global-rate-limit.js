import rateLimit from 'express-rate-limit';

export default function globalRateLimit() {
  return rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later' },
    validate: { trustProxy: false },
  });
}
