import { NanoIdValueObject } from "@sharedKernel/domain/valueobject";

export class TaskId extends NanoIdValueObject {
    constructor(id: string) {
        super("task", id);
    }
}