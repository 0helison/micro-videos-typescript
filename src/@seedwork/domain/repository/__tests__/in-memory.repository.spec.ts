import Entity from "#seedwork/domain/entity/entity";
import NotFoundError from "#seedwork/domain/errors/not-found.error";
import UniqueEntityId from "#seedwork/domain/value-objects/unique-entity-id-vo";
import {InMemoryRepository} from "../in-memmory.repository";

type StubEntityProps = {
    name: string;
    price: number
}

class StubEntity extends Entity<StubEntityProps>{}

class StubInMemoryRepository extends InMemoryRepository<StubEntity>{}

describe('InMemoryRepository Unit Tests', () => {
    let repository = new StubInMemoryRepository()

    beforeEach(() => repository = new StubInMemoryRepository())
    it('should inserts a new entity', async () => {
        const entity = new StubEntity({name: 'value', price: 5})
        await repository.insert(entity)

        expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON())
    })

    it('should throws error when entity not found', () => {
        expect(repository.findById('fake id')).rejects.toThrow(
            new NotFoundError('Entity not found using ID fake id')
        )

        const id = new UniqueEntityId()
        expect(repository.findById(id)).rejects.toThrow(
            new NotFoundError(`Entity not found using ID ${id}`)
        )
    })

    it('should finds a entity by id', async () => {
        const entity = new StubEntity({name: 'value', price: 5})
        await repository.insert(entity)

        let entityFound = await repository.findById(entity.id)

        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON())

        entityFound = await repository.findById(entity.uniqueEntityId)

        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON())
    })

    it('should returns all entities', async () => {
        const entity = new StubEntity({name: 'value', price: 5})
        await repository.insert(entity)

        const entities = await repository.findAll()

        expect(entities).toStrictEqual([entity])
    })

    it('should throws error on update when entity not found', () => {
        const entity = new StubEntity({name: 'value', price: 5})

        expect(repository.update(entity)).rejects.toThrow(
            new NotFoundError(`Entity not found using ID ${entity.id}`)
        )
    })

    it('should updates an entity', async () => {
        const entity = new StubEntity({name: 'value', price: 5})
        await repository.insert(entity)
        const entityUpdated = new StubEntity({name: 'updated', price: 1}, entity.uniqueEntityId)

        await repository.update(entityUpdated)

        expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON())
    })

    it('should throws error on delete when entity not found', () => {
        const id = new UniqueEntityId()

        expect(repository.delete(id)).rejects.toThrow(
            new NotFoundError(`Entity not found using ID ${id}`)
        )
    })

    it('should deletes an entity', async () => {
        const entity = new StubEntity({name: 'value', price: 5})
        await repository.insert(entity)

        await repository.delete(entity.id)
        expect(repository.items).toHaveLength(0)

        await repository.insert(entity)

        await repository.delete(entity.uniqueEntityId)
        expect(repository.items).toHaveLength(0)
    })
})