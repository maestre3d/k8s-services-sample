import { DomainError } from './domain.error';
import { DomainErrors } from './domain.errors.enum';

export class InvalidFormatError extends DomainError {
    constructor(field: string, stack?: string, ... formatTypes: Array<string>) {
        const message = InvalidFormatError.formatMessage(field, ...formatTypes);
        super(field, DomainErrors.InvalidFormat,
            message, stack);
    }

    private static formatMessage(field: string, ... formatTypes: Array<string>): string {
        let message = `${field} has an invalid format, expected [`;
        formatTypes.forEach((format, i) => {
            message += `${format}`;
            message += i - 1 < formatTypes.length ? ", " : "";
        });
        message += "]"
        return message;
    }
}