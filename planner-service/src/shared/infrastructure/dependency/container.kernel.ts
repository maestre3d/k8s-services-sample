import { Logger } from '@sharedKernel/domain/logger';
import { Configuration, ConfigurationInstance } from '../configuration';
import { WinstonLogger } from '../observability/logging/logger.winston';

import { container, DependencyContainer } from 'tsyringe';
import express, { Express } from 'express';

export function newKernelContainer(): DependencyContainer {
    container.register<Configuration>('Configuration', { useValue: ConfigurationInstance.getInstance() });
    container.register<Logger>('Logger', { useClass: WinstonLogger });
    container.register<Express>('HttpRouter', { useValue: express() });
    return container;
}