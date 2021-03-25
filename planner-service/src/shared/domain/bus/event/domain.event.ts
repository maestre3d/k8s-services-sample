/**
 * DomainEvent action or fact that has happened to an Aggregate Root.
 */
export interface DomainEvent {
    ID: string;
    Entity: string;
}