import 'module-alias/register';

import express from 'express';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import { CreateTodoListCommand, CreateTodoListCommandHandler, TodoListCreator } from '@planner/todos/application/create';
import { TodoMongoRepository } from '@planner/todos/infrastructure/persistence/todo.mongo.repository';

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/planner', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('open', () => {
  app.get('/', (req, res) => {
    const repo = new TodoMongoRepository()
    const creator = new TodoListCreator(repo);
    const handler = new CreateTodoListCommandHandler(creator);
    handler.invoke(new CreateTodoListCommand(nanoid(), nanoid()));
    
    res.status(200).json({
      data: "OK"
    });
  });
  
  app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
  });
});