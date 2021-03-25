import { InMemoryRepository } from '@sharedKernel/infrastructure/persistence/inmemory/inmemory.repository';
import { Todo } from '@planner/todos/domain/todo';

export class TodoInMemoryRepository extends InMemoryRepository<Todo> {}