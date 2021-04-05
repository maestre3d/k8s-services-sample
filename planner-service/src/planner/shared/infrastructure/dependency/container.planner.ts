import { HttpController } from '@sharedKernel/infrastructure/transport/http/http.controller';
import { TodoListHttpController } from '../transport/http/todolist.controller';
import { TodoListFinder } from '@planner/todos/application/find';
import { TodoMongoRepository } from '@planner/todos/infrastructure/persistence/todo.mongo.repository';

import { DependencyContainer } from 'tsyringe';

export function startPlannerContainer(kernelContainer: DependencyContainer) {
    kernelContainer.register('TodoListRepository', {useClass: TodoMongoRepository});
    kernelContainer.register(TodoListFinder, {useClass: TodoListFinder});

    const httpControllerToken = 'HttpController';
    kernelContainer.register<HttpController>(httpControllerToken, { useClass: TodoListHttpController });
}