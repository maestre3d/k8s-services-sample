import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
    _id: String,
    todoListId: { type: Schema.Types.String, ref: 'TodoList' },
    title: String,
    dueDate: { type: Date, default: Date.now },
    status: String,
    description: String,
    startDate: Date,
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

export const TaskMongo = model('Task', taskSchema);