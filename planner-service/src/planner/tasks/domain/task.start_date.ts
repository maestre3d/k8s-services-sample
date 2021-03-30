import { DateValueObject } from '@sharedKernel/domain/valueobject';

export class TaskStartDate extends DateValueObject {
    constructor(startDate: Date) {
        super(startDate);
    }
}