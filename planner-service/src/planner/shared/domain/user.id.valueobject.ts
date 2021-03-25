import { NanoIdValueObject } from "@sharedKernel/domain/valueobject";

export class UserId extends NanoIdValueObject {
    constructor(id: string) {
        super(id);
    }
}