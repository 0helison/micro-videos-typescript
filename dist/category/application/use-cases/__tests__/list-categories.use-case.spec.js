"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("#category/domain/entities/category");
const category_repository_1 = __importDefault(require("#category/domain/repository/category.repository"));
const category_in_memory_repository_1 = __importDefault(require("#category/infra/repository/category-in-memory.repository"));
const list_categories_use_case_1 = __importDefault(require("../list-categories.use-case"));
describe('ListCategoriesUseCase Unit Tests', () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.default();
        useCase = new list_categories_use_case_1.default(repository);
    });
    test('toOutput method ', async () => {
        const result = new category_repository_1.default.SearchResult({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null
        });
        const output = useCase['toOutput'](result);
        expect(output).toStrictEqual({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 2,
            last_page: 1,
        });
    });
    test('toOutput method ', async () => {
        let result = new category_repository_1.default.SearchResult({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null
        });
        let output = useCase['toOutput'](result);
        expect(output).toStrictEqual({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 2,
            last_page: 1,
        });
        const entity = new category_1.Category({ name: 'Movie' });
        result = new category_repository_1.default.SearchResult({
            items: [entity],
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null
        });
        output = useCase['toOutput'](result);
        expect(output).toStrictEqual({
            items: [entity.toJSON()],
            total: 1,
            current_page: 1,
            per_page: 2,
            last_page: 1,
        });
    });
    it('should returns output using empty input with categories ordered by created_at', async () => {
        const items = [
            new category_1.Category({ name: 'test 1' }),
            new category_1.Category({ name: 'test 2', created_at: new Date(new Date().getTime() + 100) })
        ];
        repository.items = items;
        const output = await useCase.execute({});
        expect(output).toStrictEqual({
            items: [...items].reverse().map((i) => i.toJSON()),
            total: 2,
            current_page: 1,
            per_page: 15,
            last_page: 1,
        });
    });
    it('should returns output using pagination, sort and filter', async () => {
        const items = [
            new category_1.Category({ name: 'a' }),
            new category_1.Category({ name: 'AAA' }),
            new category_1.Category({ name: 'AaA' }),
            new category_1.Category({ name: 'b' }),
            new category_1.Category({ name: 'c' })
        ];
        repository.items = items;
        let output = await useCase.execute({
            page: 1,
            per_page: 2,
            sort: 'name',
            filter: 'a'
        });
        expect(output).toStrictEqual({
            items: [items[1].toJSON(), items[2].toJSON()],
            total: 3,
            current_page: 1,
            per_page: 2,
            last_page: 2,
        });
        output = await useCase.execute({
            page: 2,
            per_page: 2,
            sort: 'name',
            filter: 'a'
        });
        expect(output).toStrictEqual({
            items: [items[0].toJSON()],
            total: 3,
            current_page: 2,
            per_page: 2,
            last_page: 2,
        });
        output = await useCase.execute({
            page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            filter: 'a'
        });
        expect(output).toStrictEqual({
            items: [items[0].toJSON(), items[2].toJSON()],
            total: 3,
            current_page: 1,
            per_page: 2,
            last_page: 2,
        });
    });
});
