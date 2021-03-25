import { DomainEvent } from "./domain.event";

/**
 * EventBus propagates side-effects of actions or facts that had happened in the past into the whole ecosystem.
 */
export interface EventBus {
    /**
     * publish propagates the given events as side-effects to the whole ecosystem
     * @param events actions or facts that will be propagated
     */
    publish(...events: Array<DomainEvent>): void
}