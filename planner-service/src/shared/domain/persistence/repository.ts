import { NanoIdValueObject } from '../valueobject';

/**
 * Repository handles all persistence store interactions
 */
export interface Repository<T> {
    save(item: T): void
    find(id: NanoIdValueObject): T
    search(): Array<T>
    remove(id: NanoIdValueObject): void
}