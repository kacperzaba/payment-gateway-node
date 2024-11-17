import { format, createLogger, transports } from 'winston';
const { timestamp, combine, errors, json } = format;
import 'winston-daily-rotate-file';

const fileRotateTransport = new transports.DailyRotateFile({
    filename: './logs/combined-%DATE%.log', // zrobic jako zmienna srodowiskowa
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    auditFile: './logs/audit-files/audit-log.json' // zrobic jako zmienna srodowiskowa
  });

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info', // zrobic jako zmienna srodowiskowa
    format: combine(timestamp(), errors({ stack: true }), json(),),
    defaultMeta: { service: 'user-service '},
    transports: [
        new transports.Console(),
        fileRotateTransport,
    ],
})

export default logger;