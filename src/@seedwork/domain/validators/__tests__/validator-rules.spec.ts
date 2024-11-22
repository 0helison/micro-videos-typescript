import { ValidationError } from "#seedwork/domain/errors/validation-error"
import ValidatorRules from "../validator-rules"

describe('Validator Rules Unit Tests', () => {
    test('values method', () => {
        const validator = ValidatorRules.values('some value', 'field')
        expect(validator).toBeInstanceOf(ValidatorRules)
        expect(validator['value']).toBe('some value')
        expect(validator['property']).toBe('field')
    })

    test('required validation rule', () => {
        // invalid cases
        let arrange: {value: any, property: string, messageError: string}[] = [
            {value: null, property: 'field', messageError: 'The field is required'},
            {value: undefined, property: 'field', messageError: 'The field is required'},
            {value: '', property: 'field', messageError: 'The field is required'}
        ]

        arrange.forEach(item => {
            expect(
                () => ValidatorRules.values(item.value, item.property).required())
                    .toThrow(new ValidationError(item.messageError))
        })
        // valid cases
        arrange = [
            {value: 'test', property: 'field', messageError: 'The field is required'},
            {value: 5, property: 'field', messageError: 'The field is required'},
            {value: 0, property: 'field', messageError: 'The field is required'},
            {value: false, property: 'field', messageError: 'The field is required'}
        ]

        arrange.forEach(item => {
            expect(
                () => ValidatorRules.values(item.value, item.property).required())
                    .not.toThrow(new ValidationError(item.messageError))
        }) 
    })

    test('string validation rule', () => {
        // invalid cases
        let arrange: {value: any, property: string, messageError: string}[] = [
            {value: true, property: 'field', messageError: 'The field must be a string'},
            {value: false, property: 'field', messageError: 'The field must be a string'},
            {value: 1, property: 'field', messageError: 'The field must be a string'},
            {value: 2, property: 'field', messageError: 'The field must be a string'},
            {value: {name: 'movie'}, property: 'field', messageError: 'The field must be a string'},
            {value: ['a', 'b'], property: 'field', messageError: 'The field must be a string'},
            {value: [false, 1], property: 'field', messageError: 'The field must be a string'},
        ]

        arrange.forEach(item => {
            expect(
                () => ValidatorRules.values(item.value, item.property).string())
                    .toThrow(new ValidationError(item.messageError))
        })

        // valid case
        arrange = [
            {value: null, property: 'field', messageError: 'The field must be a string'},
            {value: undefined, property: 'field', messageError: 'The field must be a string'},
            {value: 'test', property: 'field', messageError: 'The field must be a string'}
        ]
        arrange.forEach(item => {
            expect(
                () => ValidatorRules.values(item.value, item.property).string())
                    .not.toThrow(new ValidationError(item.messageError))
        })
    })

    test('maxLength validation rule', () => {
        // invalid cases
        expect(() => ValidatorRules.values('things', 'field').maxLength(5))
            .toThrow(new ValidationError('The field must be less or equal than 5 characteres'))

        // valid cases
        let arrange: {value: any, property: string, messageError: string}[] = [
            {value: null, property: 'field', messageError: 'The field must be less or equal than 5 characteres'},
            {value: undefined, property: 'field', messageError: 'The field must be less or equal than 5 characteres'},
            {value: 'thing', property: 'field', messageError: 'The field must be less or equal than 5 characteres'},
            {value: 'this', property: 'field', messageError: 'The field must be less or equal than 5 characteres'},
        ]
        arrange.forEach(item => {
            expect(
                () => ValidatorRules.values(item.value, item.property).maxLength(5))
                    .not.toThrow(new ValidationError(item.messageError))
        })
    })

    test('boolean validation rule', () => {
        // invalid cases
        let arrange: {value: any, property: string, messageError: string}[] = [
            {value: 1, property: 'field', messageError: 'The field must be a boolean'},
            {value: 2, property: 'field', messageError: 'The field must be a boolean'},
            {value: 'false', property: 'field', messageError: 'The field must be a boolean'},
            {value: {name: 'movie'}, property: 'field', messageError: 'The field must be a boolean'},
            {value: ['a', 'b'], property: 'field', messageError: 'The field must be a boolean'},
            {value: [false, 1], property: 'field', messageError: 'The field must be a boolean'},
        ]

        arrange.forEach(item => {
            expect(
                () => ValidatorRules.values(item.value, item.property).boolean())
                    .toThrow(new ValidationError(item.messageError))
        })

        // valid case
        arrange = [
            {value: null, property: 'field', messageError: 'The field must be a boolean'},
            {value: undefined, property: 'field', messageError: 'The field must be a boolean'},
            {value: true, property: 'field', messageError: 'The field must be a boolean'},
            {value: false, property: 'field', messageError: 'The field must be a boolean'}
        ]
        arrange.forEach(item => {
            expect(
                () => ValidatorRules.values(item.value, item.property).boolean())
                    .not.toThrow(new ValidationError(item.messageError))
        })
    })

    it('should throw a validation error when combine two or more validation rules', () => {
        let validator = ValidatorRules.values(null, 'field');
        expect(() => validator.required().string().maxLength(5))
            .toThrow(new ValidationError('The field is required'))

        validator = ValidatorRules.values(5, 'field');
        expect(() => validator.required().string().maxLength(5))
            .toThrow(new ValidationError('The field must be a string'))

        validator = ValidatorRules.values('things', 'field');
        expect(() => validator.required().string().maxLength(5))
            .toThrow(new ValidationError('The field must be less or equal than 5 characteres'))

        validator = ValidatorRules.values(null, 'field');
        expect(() => validator.required().boolean())
            .toThrow(new ValidationError('The field is required'))

        validator = ValidatorRules.values('false', 'field');
        expect(() => validator.required().boolean())
            .toThrow(new ValidationError('The field must be a boolean'))
    })

    it('should valid when combine two or more validation rules', () => {
        expect.assertions(0)
        ValidatorRules.values('this', 'field').required().string()
        ValidatorRules.values('tests', 'field').required().string().maxLength(5)

        ValidatorRules.values(true, 'field').required().boolean()
        ValidatorRules.values(false, 'field').required().boolean().maxLength(5)
    })
})