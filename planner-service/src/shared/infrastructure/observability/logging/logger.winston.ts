import { Logger } from '@sharedKernel/domain/logger';
import { ApplicationStages } from '@sharedKernel/infrastructure/configuration/configuration.application';
import { Configuration } from '../../configuration/configuration';

import winston from 'winston';
import 'winston-daily-rotate-file';
import { inject, injectable } from 'tsyringe';

@injectable()
export class WinstonLogger implements Logger {
    private _logger: winston.Logger;

    constructor(@inject('Configuration') configuration: Configuration) {
        this._logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { 
                service: configuration.application.service,
                timestamp: Date.now(),
            },
            transports: [
                new winston.transports.DailyRotateFile({
                    filename: `logs/${configuration.application.service}-%DATE%.error.log`,
                    datePattern: 'YYYY-DD-MM',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d',
                    level: 'error'
                }),
                new winston.transports.DailyRotateFile({
                    filename: `logs/${configuration.application.service}-%DATE%.log`,
                    datePattern: 'YYYY-DD-MM',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d'
                })
            ],
        })

        if (configuration.application.stage != ApplicationStages.Production) {
            this._logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        }
    }

    info(message: string, ...meta: any[]): void {
        this._logger.info(message, ...meta);
    }

    warn(message: string, ...meta: any[]): void {
        this._logger.warn(message, ...meta);
    }

    error(message: string, ...meta: any[]): void {
        this._logger.error(message, ...meta);
    }

    debug(message: string, ...meta: any[]): void {
        this._logger.debug(message, ...meta);
    }
}
