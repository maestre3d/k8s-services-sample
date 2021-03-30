import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
    _id: String,
    userId: String,
    tasks: [{ type: Schema.Types.String, ref: 'Task' }],
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

export const TodoMongo = model('TodoList', todoSchema);