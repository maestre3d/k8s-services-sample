/**
 * NumberValueObject used by value objects whom contain an number as main value.
 * 
 * Contains useful utils to export hidden primitive value.
 */
 export abstract class NumberValueObject {
    protected _value: number;

    constructor(value: number) {
        this._value = value;
    }

    /**
     * returns a primtive value
     * @returns the current primitive value
     */
    value(): number {
        return this._value;
    }

    /**
     * replaces JS's vanilla toString() method
     * @returns the current primitive value
     */
    toString(): string {
        return this._value.toString();
    }
}