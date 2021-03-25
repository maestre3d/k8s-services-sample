import { Repository } from "@sharedKernel/domain/persistence/repository";
import { Todo } from "./todo";

export interface TodoRepository extends Repository<Todo> {}