import { NanoIdValueObject } from "../valueobject";
import { AggregateRoot } from "./aggregate.root";

/**
 * AuditableAggregate contains a set of required properties to keep a Change Data Capture pattern-aware (CDC) persistence store
 */
export class AuditableAggregate extends AggregateRoot {
    protected createTime: Date = new Date();
    protected updateTime: Date = new Date();
    protected active: boolean = true;

    constructor(id: NanoIdValueObject) {
        super(id);
    }
}