import { TodoId } from "@planner/shared/domain";
import { Todo } from "@planner/todos/domain/todo";
import { TodoRepository } from "@planner/todos/domain/todo.repository";
import { NotFoundError } from "@sharedKernel/domain/error";

export class TodoListFinder {
    private _repository: TodoRepository;

    constructor(repository: TodoRepository) {
        this._repository = repository;
    }

    async invoke(id: TodoId): Promise<Todo> {
        const todoList = await this._repository.find(id);
        if (todoList == null) {
            throw new NotFoundError("todo_list");
        }
        return todoList;
    }
}