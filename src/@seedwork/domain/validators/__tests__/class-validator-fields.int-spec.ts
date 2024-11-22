import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"
import ClassValidatorFields from "../class-validator-fields"

class StubRules{
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    constructor(data: any){
        Object.assign(this, data)
    }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
    validate(data: any): boolean {
        return super.validate(new StubRules(data))
    }   
}

describe('ClassValidatorFields integration Tests', () => {
    it('should validate with errors', () => {
        const validator = new StubClassValidatorFields()

        expect(validator.validate(null)).toBeFalsy()
        // console.log(validator.errors);
        expect(validator.errors).toStrictEqual({
            name: [
              'name should not be empty',
              'name must be a string',
              'name must be shorter than or equal to 255 characters'
            ],
            price: [
              'price should not be empty',
              'price must be a number conforming to the specified constraints'
            ]
        }) 
    })

    it('should be valid', () => {
        const validator = new StubClassValidatorFields()

        expect(validator.validate({name: "Things 1", price: 2})).toBeTruthy()
        expect(validator.validatedData).toStrictEqual(new StubRules({name: "Things 1", price: 2}))
    })
})