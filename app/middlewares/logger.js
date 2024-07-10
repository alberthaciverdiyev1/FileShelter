const express = require('express');
const app = express();
const logger = require('../helpers/logger.js');

app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    ip: req.ip,
  });

  res.status(500).json({ error: 'Internal Server Error' });
});
