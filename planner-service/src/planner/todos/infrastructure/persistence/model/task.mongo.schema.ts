import { Schema } from 'mongoose';

export const taskSchema = new Schema({
    taskId: String,
    title: String,
    description: String,
    createTime: Date,
    updateTime: Date,
    active: Boolean
});