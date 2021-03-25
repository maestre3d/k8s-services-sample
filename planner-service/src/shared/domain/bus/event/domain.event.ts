import { v4 as uuidv4 } from 'uuid';

/**
 * DomainEvent action or fact that has happened to an Aggregate Root.
 */
export abstract class DomainEvent {
    private _aggregateId: string;
    private _eventId: string;
    private _occurredTime: string;

    constructor(aggregateId: string, eventId?: string, occurredTime?: string) {
        this._aggregateId = aggregateId;
        this._eventId = eventId || uuidv4();
        this._occurredTime = occurredTime || new Date().toISOString();
    }

    abstract eventName(): string;
    abstract toPrimtives(): Map<string, any>;
    abstract fromPrimitives(
        aggregateId: string, 
        body: Map<string, any>,
        eventId?: string, 
        occurredTime?: string): DomainEvent;
    
    get aggregateId(): string {
        return this._aggregateId;
    }

    get eventId(): string {
        return this._eventId;
    }

    get occurredTime(): string {
        return this._occurredTime;
    }
}