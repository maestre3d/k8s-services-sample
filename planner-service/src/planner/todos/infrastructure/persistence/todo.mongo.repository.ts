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

    async find(id: NanoIdValueObject): Promise<Todo | null> {
        const res = await TodoMongoModel.findOne({todoId: id.toString()}).exec();
        if (!res) {
            return null;
        }
        return null;
    }

    async search(): Promise<Todo[] | null> {
        throw new Error('Method not implemented.');
    }

    remove(id: NanoIdValueObject): void {
        throw new Error('Method not implemented.');
    }
}