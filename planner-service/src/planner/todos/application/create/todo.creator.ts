import { EventBus } from "@sharedKernel/domain/bus/event/event.bus";
import { UserId } from "@planner/shared/domain";
import { Todo } from "@planner/todos/domain/todo";
import { TodoId } from "@planner/shared/domain";
import { TodoListRepository } from "../../domain/todo.repository";

export class TodoListCreator {
    private _repository: TodoListRepository;
    private _eventBus?: EventBus;

    constructor(repository: TodoListRepository, eventBus?: EventBus) {
        this._repository = repository;
        this._eventBus = eventBus;
    }

    invoke(todoId: TodoId, userId: UserId): void {
        const todoList = new Todo(todoId, userId);
        this._repository.save(todoList);
        if (this._eventBus) {
            this._eventBus.publish(...todoList.pullEvents());
        }
    }
}