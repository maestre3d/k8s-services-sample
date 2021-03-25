import { AuditableAggregate } from '@sharedKernel/domain/aggregate';
import { TaskId } from './task.id';

export class Task extends AuditableAggregate {
    private title: string = "";
    private description?: string;
    private startDate?: Date;
    private dueDate: Date = new Date();

    constructor(id: TaskId, title: string, dueDate: Date, description?: string, startDate?: Date, ) {
        super(id);
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.startDate = startDate;
    }
}