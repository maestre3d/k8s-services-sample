import { StringValueObject } from '@sharedKernel/domain/valueobject/string.valueobject';
import { OutOfRangeError } from '@sharedKernel/domain/error';

/**
 * TaskTitle The task main title, it is recommended to be short and concise
 */
export class TaskTitle extends StringValueObject {
    private static minLength = 1;
    private static maxLength = 64;

    constructor(title: string) {
        TaskTitle.ensureLength(title);
        super(title);
    }

    private static ensureLength(title: string) {
        if (title.length < this.minLength || title.length > this.maxLength) {
            throw new OutOfRangeError("task_title", this.minLength.toString(), this.maxLength.toString());
        }
    }
}