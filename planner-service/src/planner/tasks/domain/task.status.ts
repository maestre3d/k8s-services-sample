import { InvalidFormatError } from "@sharedKernel/domain/error";
import { StringValueObject } from "@sharedKernel/domain/valueobject";
import { TaskStatusEnum } from "./task.status.enum";

export class TaskStatus extends StringValueObject {
    constructor(status?: string) {
        TaskStatus.ensureValid(status);
        super(status || TaskStatusEnum.Todo);
    }

    private static ensureValid(status?: string) {
        const notValid = status != TaskStatusEnum.Todo && status != TaskStatusEnum.InProgress && 
            status != TaskStatusEnum.Done;
        if (notValid) {
            throw new InvalidFormatError("task_status", undefined, TaskStatusEnum.Todo, 
            TaskStatusEnum.InProgress, TaskStatusEnum.Done);
        }
    }

    isTodo(): boolean {
        return this.value() == TaskStatusEnum.Todo;
    }

    isInProgress(): boolean {
        return this.value() == TaskStatusEnum.InProgress;
    }

    isDone(): boolean {
        return this.value() == TaskStatusEnum.Done;
    }
}