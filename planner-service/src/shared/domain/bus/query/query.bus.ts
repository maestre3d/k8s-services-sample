import { Query } from "./query";

export interface QueryBus {
    ask(query: Query): Promise<any>
}