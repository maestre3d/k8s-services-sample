import 'module-alias/register';
import 'reflect-metadata';

import { newKernelContainer } from '@sharedKernel/infrastructure/dependency/container.kernel';
import { startPlannerContainer } from '@planner/shared/infrastructure/dependency/container.planner';
import { MongoDBPool } from '@sharedKernel/infrastructure/persistence/mongo/mongo.pool';

import { container } from 'tsyringe';
import { startHttpContainer } from '@sharedKernel/infrastructure/dependency/container.http';
import { HttpServer } from '@sharedKernel/infrastructure/transport/http/http.server';

function main() {
  const kernel = newKernelContainer();
  startPlannerContainer(kernel);
  startHttpContainer(kernel);
  const server = kernel.resolve(HttpServer);
  server.listenAndServe();
  initInfrastructure();
}

function initInfrastructure() {
  const mongoPool = container.resolve(MongoDBPool);
  mongoPool.start();
}

main()
