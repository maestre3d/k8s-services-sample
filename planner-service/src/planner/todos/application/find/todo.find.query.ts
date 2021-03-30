import { Query } from "@sharedKernel/domain/bus/query";

export class TodoListFindQuery implements Query {
    todoListId: string;

    constructor(todoListId: string) {
        this.todoListId = todoListId;
    }
}