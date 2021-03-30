import { Todo } from "@planner/todos/domain/todo";

export interface TodoListResponse {
    todo_list_id: string;
    user_id: string;
    tasks: any[];
    create_time: string;
    update_time: string;
    active: boolean;
}

export function marshalTodoListResponse(todo: Todo): TodoListResponse {
    return {
        todo_list_id: todo.id.toString(),
        user_id: todo.userId.toString(),
        tasks: todo.tasks,
        create_time: todo.createTime.toISOString(),
        update_time: todo.updateTime.toISOString(),
        active: todo.active.valueOf()
    }
}