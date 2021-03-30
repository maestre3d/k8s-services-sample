import { TodoId, UserId } from "@planner/shared/domain";
import { CommandHandler } from "@sharedKernel/domain/bus/command";
import { CreateTodoListCommand } from ".";
import { TodoListCreator } from "./todo.creator";

export class CreateTodoListCommandHandler implements CommandHandler {
    private creator: TodoListCreator;

    constructor(creator: TodoListCreator) {
        this.creator = creator;
    }

    invoke(command: CreateTodoListCommand): void {
        const todoListId = new TodoId(command.todoListId);
        const userId = new UserId(command.userId);
        this.creator.invoke(todoListId, userId);
    }
}