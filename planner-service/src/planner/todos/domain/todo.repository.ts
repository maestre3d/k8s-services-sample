import { Repository } from "@sharedKernel/domain/persistence/repository";
import { Todo } from "./todo";

export interface TodoListRepository extends Repository<Todo> {}