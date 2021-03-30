import { DomainError } from './domain.error';
import { DomainErrors } from './domain.errors.enum';

export class AlreadyExistsError extends DomainError {
    constructor(entity: string, stack?: string) {
        super(entity, DomainErrors.AlreadyExists, 
            `${entity} already exists`, stack);
    }
}
