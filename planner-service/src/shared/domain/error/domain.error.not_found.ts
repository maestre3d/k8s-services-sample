import { DomainError } from './domain.error';
import { DomainErrors } from './domain.errors.enum';

export class NotFoundError extends DomainError {
    constructor(entity: string, stack?: string) {
        super(entity, DomainErrors.NotFound, 
            `${entity} was not found`, stack);
    }
}
