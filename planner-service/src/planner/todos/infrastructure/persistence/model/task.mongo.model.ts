import { model } from 'mongoose';
import { taskSchema } from './task.mongo.schema';

export const TaskMongoModel = model('Task', taskSchema);