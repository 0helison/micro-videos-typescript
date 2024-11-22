import CategoryValidatorFactory, { CategoryRules, CategoryValidator } from "./category.validator"

describe('Category Validator Tests', () => {

    let validator: CategoryValidator

    beforeEach(() => validator = CategoryValidatorFactory.create())
    test('invalidation cases for name field', () => {

        expect({validator, data: null}).containsErrorMessages({
            name: [
                'name should not be empty',
                'name must be a string',
                'name must be shorter than or equal to 255 characters'
            ]
        })

        let isValid = validator.validate(null)

        expect(isValid).toBeFalsy()
        expect(validator.errors['name']).toStrictEqual([
            'name should not be empty',
            'name must be a string',
            'name must be shorter than or equal to 255 characters'
        ])
        
        isValid = validator.validate({name: ''})

        expect(isValid).toBeFalsy()
        expect(validator.errors['name']).toStrictEqual([
            'name should not be empty',
        ]) 

        isValid = validator.validate({name: 5 as any})

        expect(isValid).toBeFalsy()
        expect(validator.errors['name']).toStrictEqual([
            'name must be a string',
            'name must be shorter than or equal to 255 characters'
        ]) 

        isValid = validator.validate({name: 'p'.repeat(256)})

        expect(isValid).toBeFalsy()
        expect(validator.errors['name']).toStrictEqual([
            'name must be shorter than or equal to 255 characters'
        ]) 
    })

    test('validation cases for fields', () => {
        const arrange = [
            { name: 'things' },
            { name: 'things', description: null },
            { name: 'things', description: undefined },
            { name: 'things', is_active: true },
            { name: 'things', is_active: false },
        ] as { name: string; description?: string; is_active?: boolean }[];
        
    
        arrange.forEach((i) => {
            const isValid = validator.validate(i);
            expect(isValid).toBeTruthy();
            expect(validator.validatedData).toStrictEqual(new CategoryRules(i));
        });
    });
    
})