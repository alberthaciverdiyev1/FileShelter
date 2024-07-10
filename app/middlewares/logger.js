const logger = require('../helpers/logger.js');

const loggerMiddleware = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    ip: req.ip,
  });

  res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = loggerMiddleware;
