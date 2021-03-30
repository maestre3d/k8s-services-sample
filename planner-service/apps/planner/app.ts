import 'module-alias/register';

import os from 'os';
import cluster from 'cluster';
import express, { Request, Response, NextFunction } from 'express';
import { nanoid } from 'nanoid';

import { CreateTodoListCommand, CreateTodoListCommandHandler, TodoListCreator } from '@planner/todos/application/create';
import { TodoMongoRepository } from '@planner/todos/infrastructure/persistence/todo.mongo.repository';
import { startMongoDb } from '../../src/shared/infrastructure/persistence/mongo/mongo.pool';
import { ConfigurationInstance } from '@sharedKernel/infrastructure/configuration/configuration';
import { WinstonLoggerInstance } from '@sharedKernel/infrastructure/observability/logging/logger.winston';
import { TodoListFindQueryHandler } from '@planner/todos/application/find/todo.find.query.handler';
import { TodoListFinder } from '@planner/todos/application/find/todo.find';
import { TodoListFindQuery } from '@planner/todos/application/find/todo.find.query';
import { DomainError } from '@sharedKernel/domain/error';
import { DomainErrors } from '@sharedKernel/domain/error/domain.errors.enum';
import { wrapDomainErrorMiddleware, wrapErrorLog } from '@sharedKernel/infrastructure/transport/http/error.middleware';

const config = ConfigurationInstance.getInstance();
const logger = WinstonLoggerInstance.getInstance(config);

const repo = new TodoMongoRepository()
const creator = new TodoListCreator(repo);
const finder = new TodoListFinder(repo);

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
    const handler = new CreateTodoListCommandHandler(creator);
    handler.invoke(new CreateTodoListCommand(nanoid(), nanoid()));

    res.status(200).json({
      data: "OK"
    });
  });

  app.get('/todos/:todoId', async (req, res, next) => {
    try {
      const handler = new TodoListFindQueryHandler(finder);
      const todoList = await handler.invoke(new TodoListFindQuery(req.params.todoId));

      res.status(200).json({
        data: todoList
      });
    } catch (error) {
      next(error);
    }
  });

  app.use(wrapErrorLog(logger));
  app.use(wrapDomainErrorMiddleware);

  app.listen(port, () => {
    return logger.info('http server started', { port: port });
  });
}

main()
