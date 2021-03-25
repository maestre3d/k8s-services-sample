import { model } from 'mongoose';
import { todoSchema } from './todo.mongo.schema';

export const TodoMongoModel = model('TodoList', todoSchema);