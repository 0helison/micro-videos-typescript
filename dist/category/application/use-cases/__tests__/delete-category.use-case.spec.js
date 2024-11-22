"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("#category/domain/entities/category");
const category_in_memory_repository_1 = __importDefault(require("#category/infra/repository/category-in-memory.repository"));
const not_found_error_1 = __importDefault(require("#seedwork/domain/errors/not-found.error"));
const delete_category_use_case_1 = __importDefault(require("../delete-category.use-case"));
describe('DeleteCategoryUseCase Unit Tests', () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.default();
        useCase = new delete_category_use_case_1.default(repository);
    });
    it('should throws error when entity not found', async () => {
        expect(() => useCase.execute({ id: 'fake id' }))
            .rejects.toThrow(new not_found_error_1.default(`Entity not found using ID fake id`));
    });
    it('should delete a category', async () => {
        const items = [
            new category_1.Category({ name: 'movie' })
        ];
        repository.items = items;
        const spyDelete = jest.spyOn(repository, 'delete');
        await useCase.execute({ id: items[0].id });
        expect(spyDelete).toHaveBeenCalledTimes(1);
        expect(repository.items).toHaveLength(0);
    });
});
