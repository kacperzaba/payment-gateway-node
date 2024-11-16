const { format, createLogger, transports} = require('winston');
const { timestamp, combine, errors, json } = format;
require('winston-daily-rotate-file');

const fileRotateTransport = new transports.DailyRotateFile({
    filename: './logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    auditFile: './logs/audit-files/audit-log.json'
  });

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(timestamp(), errors({ stack: true }), json(),),
    defaultMeta: { service: 'user-service '},
    transports: [
        new transports.Console(),
        fileRotateTransport,
    ],
})

module.exports = logger;