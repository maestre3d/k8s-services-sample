/**
 * StringValueObject used by value objects whom contain an string as main value.
 * 
 * Contains useful utils to export hidden primitive value.
 */
export abstract class StringValueObject {
    protected _value: string;

    constructor(value: string) {
        this._value = value;
    }

    /**
     * returns a primtive value
     * @returns the current primitive value
     */
    value(): string {
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