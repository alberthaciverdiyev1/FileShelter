if (process.env.NODE_ENV !== 'production') {
    const logger = require('../helpers/logger.js');
  
  process.on('uncaughtException', (err) => {
    logger.error({
      message: err.message,
      stack: err.stack,
    });
    process.exit(1);
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    logger.error({
      message: 'Unhandled Rejection',
      reason: reason,
      promise: promise,
    });
  });
}