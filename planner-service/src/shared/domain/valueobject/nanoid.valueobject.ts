import { OutOfRangeError } from '@sharedKernel/domain/error';

/**
 * NanoIdValueObject used by value objects whom contain an Nano ID as main value.
 * 
 * Contains useful utils to export hidden primitive value.
 */
 export abstract class NanoIdValueObject {
    protected _value: string;
    private static minLength = 21;
    private static maxLength = 128;

    constructor(field: string, id: string) {
        NanoIdValueObject.ensureValidNanoId(field, id)
        this._value = id;
    }

    /**
     * validates the given string complies with Nano ID length standard
     * @param id 
     */
    private static ensureValidNanoId(field: string, id: string) {
        if (id.length < this.minLength || id.length > this.maxLength) {
            throw new OutOfRangeError(field, this.minLength.toString(), this.maxLength.toString());
        }
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