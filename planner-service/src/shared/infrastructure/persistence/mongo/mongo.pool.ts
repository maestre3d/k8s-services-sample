import mongoose from 'mongoose';
import { Logger } from '@sharedKernel/domain/logger';
import { Configuration } from '@sharedKernel/infrastructure/configuration/configuration';

export function startMongoDb(configuration: Configuration, logger: Logger): Promise<mongoose.Connection> {
    mongoose.connect(configuration.mongo.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    return new Promise<mongoose.Connection>((resolve, reject) => {
        db.on('open', () => {
            logger.info('connected to mongoDB', { connectionString: configuration.mongo.connectionString,
                port: configuration.mongo.port });
            resolve(db);
        });
    });
}