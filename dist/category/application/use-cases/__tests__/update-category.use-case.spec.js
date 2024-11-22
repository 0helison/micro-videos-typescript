"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("#category/domain/entities/category");
const category_in_memory_repository_1 = __importDefault(require("#category/infra/repository/category-in-memory.repository"));
const not_found_error_1 = __importDefault(require("#seedwork/domain/errors/not-found.error"));
const update_category_use_case_1 = __importDefault(require("../update-category.use-case"));
describe('UpdateCategoryUseCase Unit Tests', () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.default();
        useCase = new update_category_use_case_1.default(repository);
    });
    it('should throws error when entity not found', async () => {
        expect(() => useCase.execute({ id: 'fake id', name: 'Movie' }))
            .rejects.toThrow(new not_found_error_1.default(`Entity not found using ID fake id`));
    });
    it('should update a category', async () => {
        const spyUpdate = jest.spyOn(repository, 'update');
        const entity = new category_1.Category({ name: 'Movie' });
        repository.insert(entity);
        let output = await useCase.execute({ id: entity.id, name: 'test' });
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: entity.id,
            name: 'test',
            description: null,
            is_active: true,
            created_at: entity.created_at
        });
        output = await useCase.execute({ id: entity.id, name: 'test', description: 'some description' });
        expect(output).toStrictEqual({
            id: entity.id,
            name: 'test',
            description: 'some description',
            is_active: true,
            created_at: entity.created_at
        });
        output = await useCase.execute({ id: entity.id, name: 'test' });
        expect(output).toStrictEqual({
            id: entity.id,
            name: 'test',
            description: null,
            is_active: true,
            created_at: entity.created_at
        });
        output = await useCase.execute({ id: entity.id, name: 'test', is_active: false });
        expect(output).toStrictEqual({
            id: entity.id,
            name: 'test',
            description: null,
            is_active: false,
            created_at: entity.created_at
        });
        output = await useCase.execute({ id: entity.id, name: 'test' });
        expect(output).toStrictEqual({
            id: entity.id,
            name: 'test',
            description: null,
            is_active: false,
            created_at: entity.created_at
        });
        output = await useCase.execute({ id: entity.id, name: 'test', is_active: true });
        expect(output).toStrictEqual({
            id: entity.id,
            name: 'test',
            description: null,
            is_active: true,
            created_at: entity.created_at
        });
        output = await useCase.execute({ id: entity.id, name: 'test', description: 'some description', is_active: false });
        expect(output).toStrictEqual({
            id: entity.id,
            name: 'test',
            description: 'some description',
            is_active: false,
            created_at: entity.created_at
        });
    });
});
