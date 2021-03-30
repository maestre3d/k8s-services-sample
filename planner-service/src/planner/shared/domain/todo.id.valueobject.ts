import { NanoIdValueObject } from "@sharedKernel/domain/valueobject";

export class TodoId extends NanoIdValueObject {
    constructor(id: string) {
        super("todo_list_id", id);
    }
}