import { NanoIdValueObject } from '../valueobject';

/**
 * Repository handles all persistence store interactions
 */
export interface Repository<T> {
    save(item: T): void
    find(id: NanoIdValueObject): Promise<T | null>
    search(): Promise<Array<T> | null>
    remove(id: NanoIdValueObject): void
}