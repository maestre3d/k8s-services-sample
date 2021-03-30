import { OutOfRangeError } from "@sharedKernel/domain/error";
import { StringValueObject } from "@sharedKernel/domain/valueobject";

export class TaskDescription extends StringValueObject {
    private static maxLength = 512;

    constructor(description: string) {
        TaskDescription.ensureLength(description);
        super(description);
    }

    private static ensureLength(description: string) {
        if (description.length > this.maxLength) {
            throw new OutOfRangeError("task_description", "0", this.maxLength.toString());
        }
    } 
}