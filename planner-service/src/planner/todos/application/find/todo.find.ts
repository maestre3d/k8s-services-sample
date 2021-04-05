import { TodoId } from "@planner/shared/domain";
import { Todo } from "@planner/todos/domain/todo";
import { TodoListRepository } from "@planner/todos/domain/todo.repository";
import { NotFoundError } from "@sharedKernel/domain/error";
import { inject, injectable } from "tsyringe";

@injectable()
export class TodoListFinder {
    constructor(@inject('TodoListRepository') private repository: TodoListRepository) {}

    async invoke(id: TodoId): Promise<Todo> {
        const todoList = await this.repository.find(id);
        if (todoList == null) {
            throw new NotFoundError("todo_list");
        }
        return todoList;
    }
}