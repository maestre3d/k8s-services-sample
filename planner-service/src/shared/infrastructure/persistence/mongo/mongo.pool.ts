import { Logger } from '@sharedKernel/domain/logger';
import { Configuration } from '@sharedKernel/infrastructure/configuration/configuration';

import mongoose from 'mongoose';
import { inject, injectable } from 'tsyringe';

@injectable()
export class MongoDBPool {
    constructor(@inject('Configuration') private config: Configuration, @inject('Logger') private logger: Logger) {}

    async start() {
        try {
            await mongoose.connect(this.config.mongo.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
            this.logger.info('connected to MongoDB cluster', { 'connection_string': this.config.mongo.connectionString,
                port: this.config.mongo.port });
        } catch (error) {
            this.logger.error('error while connecting to MongoDB cluster', { 'connection_string': this.config.mongo.connectionString,
                port: this.config.mongo.port });
        }
    }
}
