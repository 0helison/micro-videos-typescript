import ValueObject from "../value-object";

class StubValueObject extends ValueObject {}

describe('ValueObject Unit Tests', () => {
    it('should set value', () => {
        let vo = new StubValueObject("string value");
        expect(vo.value).toBe("string value");

        vo = new StubValueObject({ prop1: "value" });
        expect(vo.value).toStrictEqual({ prop1: "value" });
    });

    it('should convert to a string', () => {
        const date = new Date();
        const arrange = [
            { received: null, expected: "null" },
            { received: undefined, expected: "undefined" },
            { received: "", expected: "" },
            { received: "fake test", expected: "fake test" },
            { received: 0, expected: "0" }, 
            { received: 1, expected: "1" },
            { received: 5, expected: "5" },
            { received: true, expected: "true" }, 
            { received: false, expected: "false" },
            { received: date, expected: date.toString() }, 
            { received: { prop: "value1" }, expected: JSON.stringify({prop: "value1"}) }, 
        ];

        arrange.forEach((value) => {
            const vo = new StubValueObject(value.received); 
            expect(vo + "").toBe(value.expected); 
        });
    });

    it('should must be a immutable object', () => {
        const obj= {
            prop1: 'value1', deep: {prop2: 'value2', prop3: new Date()}
        }

        const vo = new StubValueObject(obj)

        expect(() => {(vo as any).value.prop1 = 'other value 1'})
            .toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'")

        expect(() => {(vo as any).value.deep.prop2 = 'other value 2'})
            .toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'")

        expect((vo as any).value.deep.prop3).toBeInstanceOf(Date)
            
    })
});
