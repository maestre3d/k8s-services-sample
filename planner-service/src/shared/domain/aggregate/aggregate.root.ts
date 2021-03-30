import { DomainEvent } from "../bus/event/domain.event";
import { NanoIdValueObject } from "../valueobject";

/**
 * AggregateRoot is a component inside a domain context. 
 * 
 * Thus, an aggregate root is able to perform tasks as ACID transactions within a module from context's boundaries.
 */
export abstract class AggregateRoot {
    protected _id: NanoIdValueObject;

    // event in-memory queue
    private _domainEvents: Array<DomainEvent> = new Array<DomainEvent>();

    constructor(id: NanoIdValueObject) {
        this._id = id;
    }

    /**
     * pullEvents pops and then flushes in-memory domain events from the current aggregate root
     */
    pullEvents(): Array<DomainEvent> {
        const memoizedEvents = this._domainEvents;
        this._domainEvents = new Array<DomainEvent>(); // flush/pop events
        return memoizedEvents;
    }

    /**
     * recordEvent pushes the given domain event(s) into the in-memory event dictionary from the current aggregate root
     * @param events actions or facts that happened to the current aggregate root
     */
    recordEvent(...events: Array<DomainEvent>): void {
        events.forEach(e => {
            this._domainEvents.push(e);
        });
    }

    get id(): NanoIdValueObject {
        return this._id;
    }
}