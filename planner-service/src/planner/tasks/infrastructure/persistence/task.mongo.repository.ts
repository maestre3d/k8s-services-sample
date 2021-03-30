import { Repository } from '@sharedKernel/domain/persistence/repository';
import { TaskMongo } from './model/task.mongo';
import { Task } from '@planner/tasks/domain/task';
import { TaskId } from '@planner/tasks/domain/task.id';
import { marshalTaskMongo } from './marshal/task.mongo';

export class TaskMongoRepository implements Repository<Task> {

    save(item: Task): void {
        const task = marshalTaskMongo(item);
        task.save();
    }

    async find(id: TaskId): Promise<Task | null> {
        const res = await TaskMongo.findOne({todoId: id.toString()}).exec();
        console.log(res)
        if (!res) {
            return null;
        }
        return null;
    }

    async search(): Promise<Task[] | null> {
        throw new Error('Method not implemented.');
    }

    remove(id: TaskId): void {
        throw new Error('Method not implemented.');
    }
}