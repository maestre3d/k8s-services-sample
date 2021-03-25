import { AuditableAggregate } from '@sharedKernel/domain/aggregate';
import { UserId } from 'planner/shared/domain';
import { Task } from 'planner/tasks/domain/task';
import { TodoId } from './todo.id';

export class Todo extends AuditableAggregate {
    private userId: UserId;
    private tasks: Array<Task>;

    constructor(id: TodoId, userId: UserId, tasks?: Array<Task>) {
        super(id);
        this.userId = userId;
        this.tasks = tasks || new Array<Task>();
    }

    addTask(): void {
        return;
    }
}