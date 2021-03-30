import { DomainEvent } from "@sharedKernel/domain/bus/event";

export class TaskAddedEvent extends DomainEvent {
    private todoListId: string;
    private title: string;
    private dueDate: Date;
    private startDate?: Date;
    private description?: string;
    private status: string;

    constructor(
        aggregateId: string, 
        todoListId: string,
        title: string,
        dueDate: Date,
        status: string,
        startDate?: Date,
        description?: string,
        eventId?: string, 
        occurredTime?: string) {
        super(aggregateId, eventId, occurredTime);
        this.todoListId = todoListId;
        this.title = title;
        this.dueDate = dueDate;
        this.status = status;
        this.startDate = startDate;
        this.description = description;
    }

    eventName(): string {
        return "todo_list.task.added";
    }

    toPrimtives(): Map<string, any> {
        return new Map([
            ['todo_list_id', this.todoListId],
            ['title', this.title],
            ['due_date', this.dueDate.toISOString()],
            ['start_date', this.startDate?.toISOString() || null],
            ['description', this.description ?? this.description],
            ['status', this.status]
        ]);
    }

    fromPrimitives(aggregateId: string, body: Map<string, any>, eventId?: string, occurredTime?: string): DomainEvent {
        return new TaskAddedEvent(
            aggregateId, 
            body.get('todo_list_id'), 
            body.get('title'),
            new Date(body.get('due_date')),
            body.get('status'),
            new Date(body.get('start_date')),
            body.get('description'),
            eventId, 
            occurredTime);
    }
}