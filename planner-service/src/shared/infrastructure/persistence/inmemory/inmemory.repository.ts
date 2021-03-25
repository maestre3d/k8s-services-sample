import { Repository } from '../../../domain/persistence/repository';
import { AggregateRoot } from '../../../domain/aggregate';
import { NanoIdValueObject } from '../../../domain/valueobject';

export class InMemoryRepository implements Repository<AggregateRoot> {
    private _db: Map<string, any>;

    constructor() {
        this._db = new Map<string, any>();
    }

    save(item: AggregateRoot): void {
        console.log(item);
        this._db.set(item.id.toString(), item);
    }

    find(id: NanoIdValueObject): AggregateRoot {
        throw new Error('Method not implemented.');
    }

    search(): AggregateRoot[] {
        throw new Error('Method not implemented.');
    }

    remove(): void {
        throw new Error('Method not implemented.');
    }
}