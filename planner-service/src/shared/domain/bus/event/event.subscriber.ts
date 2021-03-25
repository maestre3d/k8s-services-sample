/**
 * EventSubscriber listens to a set of Domain Events and processes specified tasks
 */
export interface EventSubscriber {
    /**
     * subscribedTo returns a set of DomainEvents keys whose current subscriber is listening to
     */
    subscribedTo(): Array<string>
}