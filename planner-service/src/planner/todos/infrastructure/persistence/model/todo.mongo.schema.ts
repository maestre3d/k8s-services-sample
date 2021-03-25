import { Schema } from 'mongoose';

export const todoSchema = new Schema({
    todoId: String,
    userId: String,
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
    createTime: Date,
    updateTime: Date,
    active: Boolean
});