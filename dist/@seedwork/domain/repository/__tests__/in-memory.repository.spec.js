"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = __importDefault(require("#seedwork/domain/entity/entity"));
const not_found_error_1 = __importDefault(require("#seedwork/domain/errors/not-found.error"));
const unique_entity_id_vo_1 = __importDefault(require("#seedwork/domain/value-objects/unique-entity-id-vo"));
const in_memmory_repository_1 = require("../in-memmory.repository");
class StubEntity extends entity_1.default {
}
class StubInMemoryRepository extends in_memmory_repository_1.InMemoryRepository {
}
describe('InMemoryRepository Unit Tests', () => {
    let repository = new StubInMemoryRepository();
    beforeEach(() => repository = new StubInMemoryRepository());
    it('should inserts a new entity', async () => {
        const entity = new StubEntity({ name: 'value', price: 5 });
        await repository.insert(entity);
        expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });
    it('should throws error when entity not found', () => {
        expect(repository.findById('fake id')).rejects.toThrow(new not_found_error_1.default('Entity not found using ID fake id'));
        const id = new unique_entity_id_vo_1.default();
        expect(repository.findById(id)).rejects.toThrow(new not_found_error_1.default(`Entity not found using ID ${id}`));
    });
    it('should finds a entity by id', async () => {
        const entity = new StubEntity({ name: 'value', price: 5 });
        await repository.insert(entity);
        let entityFound = await repository.findById(entity.id);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
        entityFound = await repository.findById(entity.uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    });
    it('should returns all entities', async () => {
        const entity = new StubEntity({ name: 'value', price: 5 });
        await repository.insert(entity);
        const entities = await repository.findAll();
        expect(entities).toStrictEqual([entity]);
    });
    it('should throws error on update when entity not found', () => {
        const entity = new StubEntity({ name: 'value', price: 5 });
        expect(repository.update(entity)).rejects.toThrow(new not_found_error_1.default(`Entity not found using ID ${entity.id}`));
    });
    it('should updates an entity', async () => {
        const entity = new StubEntity({ name: 'value', price: 5 });
        await repository.insert(entity);
        const entityUpdated = new StubEntity({ name: 'updated', price: 1 }, entity.uniqueEntityId);
        await repository.update(entityUpdated);
        expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });
    it('should throws error on delete when entity not found', () => {
        const id = new unique_entity_id_vo_1.default();
        expect(repository.delete(id)).rejects.toThrow(new not_found_error_1.default(`Entity not found using ID ${id}`));
    });
    it('should deletes an entity', async () => {
        const entity = new StubEntity({ name: 'value', price: 5 });
        await repository.insert(entity);
        await repository.delete(entity.id);
        expect(repository.items).toHaveLength(0);
        await repository.insert(entity);
        await repository.delete(entity.uniqueEntityId);
        expect(repository.items).toHaveLength(0);
    });
});
