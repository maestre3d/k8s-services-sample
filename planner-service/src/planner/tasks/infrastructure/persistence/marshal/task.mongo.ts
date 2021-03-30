import { Task } from '@planner/tasks/domain/task';
import { Document } from 'mongoose';
import { TaskMongo } from '../model/task.mongo';

/**
 * Parses the given Task aggregate into a MongoDB Document
 * @param task Aggregate to parse
 * @returns MongoDB document
 */
export function marshalTaskMongo(task: Task): Document<any, {}> {
    return new TaskMongo({
        _id: task.id,
        todoListId: task.todoListId,
        title: task.title,
        dueDate: task.dueDate,
        status: task.status,
        description: task.description,
        startDate: task.startDate,
        createTime: task.createTime,
        updateTime: task.updateTime,
        active: task.active,
    });
}

/*
export function unmarshalTaskMongo(taskDoc: Document<any, {}>): Task {
    return new Task();
}*/