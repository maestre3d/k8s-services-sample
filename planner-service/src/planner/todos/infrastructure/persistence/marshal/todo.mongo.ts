import { Todo } from '@planner/todos/domain/todo';
import { Document } from 'mongoose';
import { TodoMongo } from '../model/todo.mongo';

/**
 * Parses the given TodoList aggregate into a MongoDB Document
 * @param todo Aggregate to parse
 * @returns MongoDB document
 */
export function marshalTodoMongo(todo: Todo): Document<any, {}> {
    return new TodoMongo({
        _id: todo.id,
        userId: todo.userId,
        createTime: todo.createTime,
        updateTime: todo.updateTime,
        active: todo.active,
    });
}
