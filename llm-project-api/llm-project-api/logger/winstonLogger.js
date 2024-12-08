import dotenv from 'dotenv';
import { format, createLogger, transports } from 'winston';
const { timestamp, combine, errors, json } = format;
import 'winston-daily-rotate-file';

dotenv.config();

const fileRotateTransport = new transports.DailyRotateFile({
    filename: process.env.LOG_FILENAME,
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    auditFile: process.env.LOG_AUDITFILE 
  });

const logger = createLogger({
    level: process.env.LOG_LEVEL, 
    format: combine(timestamp(), errors({ stack: true }), json(),),
    defaultMeta: { service: 'user-service '},
    transports: [
        new transports.Console(),
        fileRotateTransport,
    ],
})

export default logger;