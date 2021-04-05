import { TodoListFinder, TodoListFindQuery, TodoListFindQueryHandler } from '@planner/todos/application/find';
import { HttpController } from '@sharedKernel/infrastructure/transport/http/http.controller';

import { Request, Response, NextFunction, Express } from 'express';
import { container, injectable } from 'tsyringe';

import { nanoid } from 'nanoid';

@injectable()
export class TodoListHttpController implements HttpController {
    constructor() {}

    mapRoutes(router: Express): void {
        router.post("/todos", this.createTodoList);
        router.get("/todos/:todoListId", this.getTodoList);
        router.get("/user/:userId/todos", this.getUserTodoLists);
    }

    private async createTodoList(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({
            data: nanoid()
        });
    }

    private async getTodoList(req: Request, res: Response, next: NextFunction) {
        try {
            const finder = container.resolve(TodoListFinder);
            const handler = new TodoListFindQueryHandler(finder);
            const todoList = await handler.invoke(new TodoListFindQuery(req.params.todoListId));

            res.status(200).json({
                data: todoList
            });
        } catch (error) {
            next(error);
        }
    }

    private async getUserTodoLists(req: Request, res: Response, next: NextFunction) {
        try {
            // TODO: Accept both id or username
            res.status(200).json({
                data: `Hello user ${req.params.userId}, these are your todo lists`
            });
        } catch (error) {
            next(error);
        }
    }
}