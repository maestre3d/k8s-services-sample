import winston from 'winston';
import { Logger } from '@sharedKernel/domain/logger';
import { ApplicationStages } from '@sharedKernel/infrastructure/configuration/configuration.application';
import { Configuration } from '../../configuration/configuration';

class WinstonLogger implements Logger {
    private _logger: winston.Logger;

    constructor(configuration: Configuration) {
        this._logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: configuration.application.service },
            transports: [
                //
                // - Write all logs with level `error` and below to `error.log`
                // - Write all logs with level `info` and below to `combined.log`
                //
                new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
                new winston.transports.File({ filename: 'logs/combined.log' }),
            ],
        })
    
        if (configuration.application.stage != ApplicationStages.Production) {
            this._logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        }
    }

    info(message: string, meta: any): void {
        this._logger.info(message, meta);
    }

    warn(message: string, meta: any): void {
        this._logger.warn(message, meta);
    }

    error(message: string, meta: any): void {
        this._logger.error(message, meta);
    }

    debug(message: string, meta: any): void {
        this._logger.debug(message, meta);
    }    
}

export class WinstonLoggerInstance {
    private static _logger: WinstonLogger;

    private constructor(){}

    static getInstance(configuration: Configuration): WinstonLogger {
        if (this._logger) {
            return this._logger;
        }

        this._logger = new WinstonLogger(configuration);
        return this._logger;
    }
}
