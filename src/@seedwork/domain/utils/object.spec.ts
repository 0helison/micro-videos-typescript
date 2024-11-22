import { deepFreeze } from "./object"

describe('object Unit Tests', () => {

    it('should not freeze a scalar value', () => {
        const str = deepFreeze('a')
        expect(typeof str).toBe('string')

        const num = deepFreeze(1)
        expect(typeof num).toBe('number')

        const boolean = deepFreeze(true)
        expect(typeof boolean).toBe('boolean')
    })

    it('should must be a immutable object', () => {
        const obj= deepFreeze({
            prop1: 'value1', deep: {prop2: 'value2', prop3: new Date()}
        })

        expect(() => {obj.prop1 = 'other value 1'})
            .toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'")

        expect(() => {obj.deep.prop2 = 'other value 2'})
            .toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'")

        expect(obj.deep.prop3).toBeInstanceOf(Date)
            
    })
})