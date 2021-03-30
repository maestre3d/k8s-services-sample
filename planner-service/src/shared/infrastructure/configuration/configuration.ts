import { Application, ApplicationStages } from "./configuration.application";
import { HttpServer } from "./configuration.http.server";
import { MongoDb } from "./configuration.mongo";

export interface Configuration {
    application: Application
    httpServer: HttpServer
    mongo: MongoDb
}

const config: Configuration = {
    application: {
        stage: process.env.APPLICATION_STAGE || ApplicationStages.Development,
        version: process.env.APPLICATION_VERSION || '1.0.0',
        service: process.env.APPLICATION_SERVICE || 'unknown-service'
    },
    httpServer: {
        port: parseInt(process.env.SERVER_PORT || '3000')
    },
    mongo: {
        connectionString: process.env.MONGO_URL || 'mongodb://localhost/planner',
        port: parseInt(process.env.MONGO_PORT || '27017')
    }
}

export default config;