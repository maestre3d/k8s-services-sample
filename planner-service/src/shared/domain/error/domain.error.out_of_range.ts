import { DomainError } from './domain.error';
import { DomainErrors } from './domain.errors.enum';

export class OutOfRangeError extends DomainError {
    constructor(field: string, a: string, b: string, stack?: string) {
        super(field, DomainErrors.OutOfRange, 
            `${field} is out of range [${a}, ${b})`, stack);
    }
}