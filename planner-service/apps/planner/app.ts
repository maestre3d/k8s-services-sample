import 'module-alias/register';

import os from 'os';
import cluster from 'cluster';
import express from 'express';
import { nanoid } from 'nanoid';

import { CreateTodoListCommand, CreateTodoListCommandHandler, TodoListCreator } from '@planner/todos/application/create';
import { TodoMongoRepository } from '@planner/todos/infrastructure/persistence/todo.mongo.repository';
import { startMongoDb } from '../../src/shared/infrastructure/persistence/mongo/mongo.pool';
import Configuration from '@sharedKernel/infrastructure/configuration/configuration';
import { WinstonLoggerInstance } from '@sharedKernel/infrastructure/observability/logging/logger.winston';

const config = Configuration;
const logger = WinstonLoggerInstance.getInstance(config);

async function main() {
  await startMongoDb(config, logger);
  bootstrapHttpServer();
}

function bootstrapHttpServer() {
  if (cluster.isMaster) {
    const CPU_THREADS = os.cpus().length;
    for (let i = 0; i < CPU_THREADS; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      logger.warn(`worker died`, { worker_id: worker.id });
      cluster.fork();
    });
  }
  startExpressRouter();
}

function startExpressRouter() {
  const app = express();
  const port = config.httpServer.port;

  app.get('/', (req, res) => {
    const repo = new TodoMongoRepository()
    const creator = new TodoListCreator(repo);
    const handler = new CreateTodoListCommandHandler(creator);
    handler.invoke(new CreateTodoListCommand(nanoid(), nanoid()));

    res.status(200).json({
      data: "OK"
    });
  });

  app.listen(port, () => {
    return logger.info('http server started', { port: port });
  });
}

main()
