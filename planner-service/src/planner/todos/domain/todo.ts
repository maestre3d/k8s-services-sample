import { AuditableAggregate } from '@sharedKernel/domain/aggregate';
import { UserId } from '@planner/shared/domain';
import { Task } from '@planner/tasks/domain/task';
import { TodoId } from './todo.id';
import { TodoListCreatedEvent } from './todo.created.event';

export class Todo extends AuditableAggregate {
    private _userId: UserId;
    private _tasks: Array<Task>;

    constructor(id: TodoId, userId: UserId, tasks?: Array<Task>) {
        super(id);
        this._userId = userId;
        this._tasks = tasks || new Array<Task>();
        this.recordEvent(new TodoListCreatedEvent(
            id.toString(),
            userId.toString()
        ));
    }

    addTask(task: Task): void {
        this._tasks.push(task);
    }

    get id(): TodoId {
        return this._id;
    }

    get userId(): UserId {
        return this._userId;
    }

    get tasks(): Array<Task> {
        return this._tasks;
    }
}