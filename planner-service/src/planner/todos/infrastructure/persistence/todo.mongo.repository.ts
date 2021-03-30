import { Repository } from '@sharedKernel/domain/persistence/repository';
import { Todo } from '@planner/todos/domain/todo';
import { TodoMongo } from './model/todo.mongo';
import { marshalTodoMongo, unmarshalTodoMongo } from './marshal/todo.mongo';
import { TodoId } from '@planner/shared/domain';

export class TodoMongoRepository implements Repository<Todo> {

    save(item: Todo): void {
        const todo = marshalTodoMongo(item);
        todo.save();
    }

    async find(id: TodoId): Promise<Todo | null> {
        const res = await TodoMongo.findById(id.toString()).exec();
        if (!res) {
            return null;
        }
        return unmarshalTodoMongo(res);
    }

    async search(): Promise<Todo[] | null> {
        throw new Error('Method not implemented.');
    }

    remove(id: TodoId): void {
        throw new Error('Method not implemented.');
    }
}