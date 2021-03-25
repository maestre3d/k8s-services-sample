/**
 * NanoIdValueObject used by value objects whom contain an Nano ID as main value.
 * 
 * Contains useful utils to export hidden primitive value.
 */
 export abstract class NanoIdValueObject {
    protected _value: string;

    constructor(id: string) {
        this.ensureValidNanoId(id)
        this._value = id;
    }

    /**
     * validates the given string complies with Nano ID length standard
     * @param id 
     */
    private ensureValidNanoId(id: string) {
        if (id.length < 21) {
            throw new Error("invalid nano id");
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