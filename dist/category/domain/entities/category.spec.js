"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unique_entity_id_vo_1 = __importDefault(require("#seedwork/domain/value-objects/unique-entity-id-vo"));
const category_1 = require("./category");
const lodash_1 = require("lodash");
describe("Category Unit Tests", () => {
    let obj;
    beforeEach(() => {
        let obj;
        category_1.Category.validate = jest.fn();
    });
    test('constructor of category', () => {
        obj = { name: "Movie" };
        let category = new category_1.Category(obj);
        let props = (0, lodash_1.omit)(category.props, 'created_at');
        expect(category_1.Category.validate).toHaveBeenCalled();
        expect(props).toStrictEqual({
            name: "Movie",
            description: null,
            is_active: true,
        });
        expect(category.props.created_at).toBeInstanceOf(Date);
        let created_at = new Date();
        obj = {
            name: "Movie",
            description: "some description",
            is_active: false,
            created_at
        };
        category = new category_1.Category(obj);
        expect(category.props).toStrictEqual(obj);
        obj = {
            name: "Movie",
            description: "other description"
        };
        category = new category_1.Category(obj);
        expect(category.props).toMatchObject(obj);
        obj = {
            name: "Movie",
            is_active: false,
        };
        category = new category_1.Category(obj);
        expect(category.props).toMatchObject(obj);
        created_at = new Date();
        obj = {
            name: "Movie",
            created_at,
        };
        category = new category_1.Category(obj);
        expect(category.props).toMatchObject(obj);
    });
    test('id field', () => {
        const data = [
            { props: { name: "Movie" } },
            { props: { name: "Movie" }, id: null },
            { props: { name: "Movie" }, id: undefined },
            { props: { name: "Movie" }, id: new unique_entity_id_vo_1.default() },
        ];
        data.forEach((i) => {
            const category = new category_1.Category(i.props, i.id);
            expect(category.id).not.toBeNull();
            expect(category.uniqueEntityId).toBeInstanceOf(unique_entity_id_vo_1.default);
        });
    });
    test('getter and setter of name prop', () => {
        obj = { name: "Movie" };
        const category = new category_1.Category(obj);
        expect(category.name).toBe("Movie");
        category['name'] = 'other name';
        expect(category.name).toBe('other name');
    });
    test('getter and setter of description prop', () => {
        obj = {
            name: "Movie",
            description: "some description",
        };
        let category = new category_1.Category(obj);
        expect(category.description).toBe("some description");
        obj = { name: "Movie" };
        category = new category_1.Category(obj);
        expect(category.description).toBeNull();
        obj = { name: "Movie" };
        category = new category_1.Category(obj);
        category['description'] = "other description";
        expect(category.description).toBe("other description");
        category['description'] = undefined;
        expect(category.description).toBeNull();
        category['description'] = null;
        expect(category.description).toBeNull();
    });
    test('getter and setter of is_active prop', () => {
        obj = {
            name: "Movie",
            is_active: false,
        };
        let category = new category_1.Category(obj);
        expect(category.is_active).toBeFalsy();
        obj = {
            name: "Movie",
            is_active: true,
        };
        category = new category_1.Category(obj);
        expect(category.is_active).toBeTruthy();
        obj = { name: "Movie" };
        category = new category_1.Category(obj);
        expect(category.is_active).toBeTruthy();
    });
    test('getter of created_at prop', () => {
        obj = { name: "Movie" };
        let category = new category_1.Category(obj);
        expect(category.created_at).toBeInstanceOf(Date);
        let created_at = new Date();
        obj = {
            name: "Movie",
            created_at,
        };
        category = new category_1.Category(obj);
        expect(category.created_at).toBe(created_at);
    });
    test('should update a category', () => {
        const category = new category_1.Category({ name: 'Movie' });
        category.update('Other Movie', 'Other Description');
        expect(category_1.Category.validate).toHaveBeenCalledTimes(2);
        expect(category.name).toBe('Other Movie');
        expect(category.description).toBe('Other Description');
    });
    test('should update a activate and desactivate', () => {
        const category = new category_1.Category({ name: 'Movie' });
        category.activate();
        expect(category.is_active).toBeTruthy();
        category.desactivate();
        expect(category.is_active).not.toBeTruthy();
    });
});