import 'module-alias/register';

import express from 'express';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import { UserId } from '@planner/shared/domain';
import { TodoListCreator } from '@planner/todos/application/create/todo.creator';
import { TodoId } from '@planner/todos/domain/todo.id';
import { TodoMongoRepository } from '@planner/todos/infrastructure/persistence/todo.mongo.repository';

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/planner', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('open', () => {
  app.get('/', (req, res) => {
    const repo = new TodoMongoRepository()
    const creator = new TodoListCreator(repo);
    creator.invoke(new TodoId(nanoid()), new UserId(nanoid()));
    res.status(200).json({
      data: "OK"
    });
  });
  
  app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
  });
});