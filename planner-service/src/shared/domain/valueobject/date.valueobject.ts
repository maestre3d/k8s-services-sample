export abstract class DateValueObject {
    protected _value: Date;

    constructor(value: Date) {
        this._value = value;
    }

    value(): Date {
        return this._value;
    }

    toString(): string {
        return this._value.toISOString();
    }

    greaterThan(other: DateValueObject): boolean {
        return other.value().getTime() < this.value().getTime();
    }
}