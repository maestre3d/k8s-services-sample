import { TodoId } from "@planner/shared/domain";
import { QueryHandler } from "@sharedKernel/domain/bus/query";
import { TodoListFinder } from "./todo.find";
import { TodoListFindQuery } from "./todo.find.query";
import { marshalTodoListResponse, TodoListResponse } from "./todo.response";


export class TodoListFindQueryHandler implements QueryHandler {
    private _finder: TodoListFinder;

    constructor(finder: TodoListFinder) {
        this._finder = finder;
    }

    async invoke(query: TodoListFindQuery): Promise<TodoListResponse> {
        const todoListId = new TodoId(query.todoListId);
        const todo = await this._finder.invoke(todoListId);
        return marshalTodoListResponse(todo);
    }
}