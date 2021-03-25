import { Repository } from '@sharedKernel/domain/persistence/repository';
import { Todo } from '@planner/todos/domain/todo';
import { NanoIdValueObject } from '@sharedKernel/domain/valueobject';
import { TodoMongoModel } from './model/todo.mongo.model';

export class TodoMongoRepository implements Repository<Todo> {

    save(item: Todo): void {
        const todo = new TodoMongoModel({
            todoId: item.id,
            userId: item.userId,
            createTime: item.createTime,
            updateTime: item.updateTime,
            active: item.active,
        });
        todo.save();
    }

    find(id: NanoIdValueObject): Todo {
        throw new Error('Method not implemented.');
    }

    search(): Todo[] {
        throw new Error('Method not implemented.');
    }

    remove(id: NanoIdValueObject): void {
        throw new Error('Method not implemented.');
    }
}