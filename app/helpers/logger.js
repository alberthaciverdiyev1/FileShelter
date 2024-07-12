if (process.env.NODE_ENV !== 'production') {
    const winston = require('winston');
    require('winston-daily-rotate-file');
    const { combine, timestamp, json } = winston.format;

    const fileRotateTransport = new winston.transports.DailyRotateFile({
        filename: 'app/logs/combined-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxFiles: '14d',
    });

    const logger = winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: combine(timestamp(), json()),
        transports: [fileRotateTransport],
    });

    module.exports = logger;
}