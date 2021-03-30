import { DateValueObject } from '@sharedKernel/domain/valueobject';

export class TaskDueDate extends DateValueObject {
    constructor(dueDate: Date) {
        super(dueDate);
    }
}