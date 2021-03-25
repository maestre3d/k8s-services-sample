import { Repository } from '../../../domain/persistence/repository';
import { NanoIdValueObject } from '../../../domain/valueobject';

export abstract class InMemoryRepository<T> implements Repository<T> {
    private _db: Map<string, any>;

    constructor() {
        this._db = new Map<string, any>();
    }

    save(item: T): void {
        console.log(item);
        // this._db.set(item.id.toString(), item);
    }

    find(id: NanoIdValueObject): T {
        throw new Error('Method not implemented.');
    }

    search(): T[] {
        throw new Error('Method not implemented.');
    }

    remove(): void {
        throw new Error('Method not implemented.');
    }
}