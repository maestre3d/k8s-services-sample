import { DomainErrors } from './domain.errors.enum';

export abstract class DomainError implements Error {
    field: string;
    name: string;
    message: string;
    stack?: string;
    
    constructor(field: string, name?: string, message?: string, stack?: string) {
        this.field = field;
        this.name = name || DomainErrors.Custom;
        this.message = message || "";
        this.stack = stack;
    }

    isCustom(): boolean {
        return this.name == DomainErrors.Custom;
    }

    isNotFound(): boolean {
        return this.name == DomainErrors.NotFound;
    }

    isAlreadyExists(): boolean {
        return this.name == DomainErrors.AlreadyExists;
    }

    isOutOfRange(): boolean {
        return this.name == DomainErrors.OutOfRange;
    }

    isInvalidFormat(): boolean {
        return this.name == DomainErrors.InvalidFormat;
    }
}