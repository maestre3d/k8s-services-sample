import { AuditableAggregate } from '@sharedKernel/domain/aggregate';
import { TaskDueDate } from './task.due_date';
import { TaskId } from './task.id';
import { TaskStartDate } from './task.start_date';
import { TaskTitle } from './task.title';
import { OutOfRangeError } from '@sharedKernel/domain/error';
import { TaskAddedEvent } from './task.added.event';
import { TodoId } from '@planner/shared/domain';
import { TaskStatus } from './task.status';
import { TaskDescription } from './task.description';

/**
 * Task An activity a User would want to track its progress
 */
export class Task extends AuditableAggregate {
    private _todoListId: TodoId;
    private _title: TaskTitle;
    private _dueDate: TaskDueDate;
    private _status: TaskStatus;
    private _description?: TaskDescription;
    private _startDate?: TaskStartDate;

    constructor(
        id: TaskId, 
        todoListId: TodoId,
        title: TaskTitle, 
        dueDate: TaskDueDate, 
        status: TaskStatus,
        description?: TaskDescription, 
        startDate?: TaskStartDate) {
        super(id);
        this._todoListId = todoListId;
        this._title = title;
        this._dueDate = dueDate;
        this._status = status;
        this._description = description;
        this._startDate = startDate;

        if (startDate && startDate.greaterThan(dueDate)) {
            throw new OutOfRangeError("start_date", dueDate.toString(), "n");
        }

        this.recordEvent(
            new TaskAddedEvent(
                id.toString(),
                todoListId.toString(),
                title.toString(),
                dueDate.value(),
                status.toString(),
                this._startDate?.value(),
                this._description?.toString()
            )
        );
    }
    
    get todoListId(): TodoId {
        return this._todoListId;
    }

    get title(): TaskTitle {
        return this._title;
    }

    get dueDate(): TaskDueDate {
        return this._dueDate;
    }

    get status(): TaskStatus {
        return this._status;
    }

    get startDate(): TaskStartDate | undefined {
        return this._startDate;
    }

    get description(): TaskDescription | undefined {
        return this._description;
    }
}