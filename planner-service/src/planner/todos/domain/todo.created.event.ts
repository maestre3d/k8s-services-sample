import { DomainEvent } from '@sharedKernel/domain/bus/event'

export class TodoListCreatedEvent extends DomainEvent {
    private userId: string;

    constructor(
        aggregateId: string, 
        userId: string,
        eventId?: string, 
        occurredTime?: string) {
        super(aggregateId, eventId, occurredTime);
        this.userId = userId;
    }

    eventName(): string {
        return 'todo_list.created';
    }

    toPrimtives(): Map<string, any> {
        return new Map<string, any>([
            ['user_id', this.userId]
        ]);
    }

    fromPrimitives(aggregateId: string, body: Map<string, any>, eventId?: string, occurredTime?: string): DomainEvent {
        return new TodoListCreatedEvent(aggregateId, body.get('user_id'), eventId, occurredTime);
    }

}