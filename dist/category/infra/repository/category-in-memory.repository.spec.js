"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("#category/domain/entities/category");
const category_in_memory_repository_1 = __importDefault(require("./category-in-memory.repository"));
describe('CategoryInMemoryRepository', () => {
    let repository;
    beforeEach(() => (repository = new category_in_memory_repository_1.default()));
    it('should no filter items when filter object is null', async () => {
        const items = [new category_1.Category({ name: 'test' })];
        const filterSpy = jest.spyOn(items, 'filter');
        let itemsFiltered = await repository['applyFilter'](items, null);
        expect(filterSpy).not.toHaveBeenCalled();
        expect(itemsFiltered).toStrictEqual(itemsFiltered);
    });
    it('should filter items using filter parameter', async () => {
        const items = [
            new category_1.Category({ name: 'test' }),
            new category_1.Category({ name: 'Test' }),
            new category_1.Category({ name: 'fake' }),
        ];
        const filterSpy = jest.spyOn(items, 'filter');
        const itemsFiltered = await repository['applyFilter'](items, 'TEST');
        expect(filterSpy).toHaveBeenCalledTimes(1);
        expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
    });
    it('should sort by created_at when sort param is null', async () => {
        const created_at = new Date();
        const items = [
            new category_1.Category({ name: 'test', created_at }),
            new category_1.Category({
                name: 'TEST',
                created_at: new Date(created_at.getTime() + 100),
            }),
            new category_1.Category({
                name: 'fake',
                created_at: new Date(created_at.getTime() + 200),
            }),
        ];
        const itemsSorted = await repository['applySort'](items, null, null);
        expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
    });
    it('should sort by name', async () => {
        const items = [
            new category_1.Category({ name: 'c' }),
            new category_1.Category({ name: 'b' }),
            new category_1.Category({ name: 'a' }),
        ];
        let itemsSorted = await repository['applySort'](items, 'name', 'asc');
        expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
        itemsSorted = await repository['applySort'](items, 'name', 'desc');
        expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
    });
});
