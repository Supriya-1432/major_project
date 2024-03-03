import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as config from './../config';
import multer from "multer";
import { NextFunction } from 'express';


// Daily File Rotation for Combined Logs
const DailyLogTransport = new DailyRotateFile({
    filename: `${config.LOGS_PATH}/combined-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    level: 'silly'
})

// Daily File Rotation for Error Logs
const DailyErrorLogTransport = new DailyRotateFile({
    filename: `${config.LOGS_PATH}/error-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    level: 'error'
})

const ConsoleLogTransport = new winston.transports.Console({
    level: 'silly',
    handleExceptions: true
})


// Generic Error/Exception Logger Handler 
const UnCaughtExceptionHandler = new winston.transports.File({ filename: `${config.LOGS_PATH}/exceptions.log` });


export const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => `[${info.timestamp}] : [${info.level}] ${info.message}`)
    ),
    transports:  [
        DailyErrorLogTransport,
        ConsoleLogTransport,
        DailyLogTransport
    ],
    exceptionHandlers:  [
        UnCaughtExceptionHandler
    ],
    exitOnError: false
});

