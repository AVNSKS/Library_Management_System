const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2,
  message: {
    error: 'Tooo many Requestt from this IP, Plese  try again later',
  },
});

const securityHeaders = helmet({
  crossOriginResourcesPolicy: { policy: 'cross-origin' },
});

module.exports = { limiter, securityHeaders };
