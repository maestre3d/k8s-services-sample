import 'module-alias/register';

import express from 'express';
import { nanoid } from 'nanoid';
import { UserId } from '@planner/shared/domain';
import { TodoListCreator } from '@planner/todos/application/create/todo.creator';
import { TodoId } from '@planner/todos/domain/todo.id';
import { TodoInMemoryRepository } from '@planner/todos/infrastructure/persistence/todo.inmemory.repository';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const repo = new TodoInMemoryRepository();
  const creator = new TodoListCreator(repo);
  creator.invoke(new TodoId(nanoid()), new UserId(nanoid()));
  res.status(200).json({
    data: "OK"
  });
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});