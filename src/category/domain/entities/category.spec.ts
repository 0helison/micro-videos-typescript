
import UniqueEntityId from "#seedwork/domain/value-objects/unique-entity-id-vo";
import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";

describe("Category Unit Tests", () => {

    let obj: CategoryProperties; 

    beforeEach(() => {
        let obj: CategoryProperties;
        Category.validate = jest.fn()
    });

    test('constructor of category', () => {
        
        obj = {name: "Movie"}
        let category = new Category(obj);
        
        let props = omit(category.props, 'created_at');
        expect(Category.validate).toHaveBeenCalled()
        expect(props).toStrictEqual({
            name: "Movie",
            description: null,
            is_active: true,
        });
        expect(category.props.created_at).toBeInstanceOf(Date);

        let created_at = new Date()
        obj = {
            name: "Movie",
            description: "some description",
            is_active: false,
            created_at}

        category = new Category(obj);
        expect(category.props).toStrictEqual(obj);

        obj = {
            name: "Movie",
            description: "other description"
        }
        category = new Category(obj);
        expect(category.props).toMatchObject(obj);

        obj = {
            name: "Movie",
            is_active: false,
        }
        category = new Category(obj);
        expect(category.props).toMatchObject(obj);

        created_at = new Date()
        obj = {
            name: "Movie",
            created_at,
        }
        category = new Category(obj);
        expect(category.props).toMatchObject(obj);
    });

    test('id field', () => {
        type CategoryData = { props: CategoryProperties; id?: UniqueEntityId};
    
        const data: CategoryData[] = [
            { props: { name: "Movie" } },
            { props: { name: "Movie" }, id: null },
            { props: { name: "Movie" }, id: undefined },
            { props: { name: "Movie" }, id: new UniqueEntityId() },
        ];
    
        data.forEach((i) => {
            const category = new Category(i.props, i.id as any);
            expect(category.id).not.toBeNull();
            expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        });
    });
    

    test('getter and setter of name prop', () => {

        obj = {name: "Movie"}
        const category = new Category(obj)
        expect(category.name).toBe("Movie")

        category['name'] = 'other name'
        expect(category.name).toBe('other name')
    })

    test('getter and setter of description prop', () => {

        obj = {
            name: "Movie",
            description: "some description",
        }
        let category = new Category(obj);
        expect(category.description).toBe("some description");

        obj = {name: "Movie"}
        category = new Category(obj);
        expect(category.description).toBeNull();

        obj = {name: "Movie"}
        category = new Category(obj);
        category['description'] = "other description";
        expect(category.description).toBe("other description");

        category['description'] = undefined;
        expect(category.description).toBeNull();

        category['description'] = null;
        expect(category.description).toBeNull();
    })

    test('getter and setter of is_active prop', () => {

        obj = {
            name: "Movie",
            is_active: false,
        }
        let category = new Category(obj);
        expect(category.is_active).toBeFalsy();

        obj = {
            name: "Movie",
            is_active: true,
        }
        category = new Category(obj);
        expect(category.is_active).toBeTruthy();

        obj = {name: "Movie"}
        category = new Category(obj);
        expect(category.is_active).toBeTruthy();
    })

    test('getter of created_at prop', () => {

        obj = {name: "Movie"}
        let category = new Category(obj);
        expect(category.created_at).toBeInstanceOf(Date);

        let created_at = new Date()
        obj = {
            name: "Movie",
            created_at,
        }
        category = new Category(obj);
        expect(category.created_at).toBe(created_at);
    })

    test('should update a category', () => {
        const category = new Category({name: 'Movie'})
        category.update('Other Movie', 'Other Description')

        expect(Category.validate).toHaveBeenCalledTimes(2)
        expect(category.name).toBe('Other Movie')
        expect(category.description).toBe('Other Description')
    })

    test('should update a activate and desactivate', () => {
        const category = new Category({name: 'Movie'})
        category.activate()

        expect(category.is_active).toBeTruthy()

        category.desactivate()
        expect(category.is_active).not.toBeTruthy()
    })

});

