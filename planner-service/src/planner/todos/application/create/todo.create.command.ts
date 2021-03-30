import { Command } from "@sharedKernel/domain/bus/command";

/**
 * Requests a new Todo List
 */
export class CreateTodoListCommand implements Command {
    todoListId: string;
    userId: string;

    constructor(todoListId: string, userId: string) {
        this.todoListId = todoListId;
        this.userId = userId;
    }

    name(): string {
        return "todo_list.create"
    }
}
