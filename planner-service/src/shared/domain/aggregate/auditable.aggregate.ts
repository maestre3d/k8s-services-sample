import { NanoIdValueObject } from "../valueobject";
import { AggregateRoot } from "./aggregate.root";

/**
 * AuditableAggregate contains a set of required properties to keep a Change Data Capture pattern-aware (CDC) persistence store
 */
export class AuditableAggregate extends AggregateRoot {
    protected _createTime: Date = new Date();
    protected _updateTime: Date = new Date();
    protected _active: boolean = true;

    constructor(id: NanoIdValueObject) {
        super(id);
    }

    get createTime(): Date {
        return this._createTime;
    }

    get updateTime(): Date {
        return this._updateTime;
    }

    get active(): boolean {
        return this._active;
    }
}