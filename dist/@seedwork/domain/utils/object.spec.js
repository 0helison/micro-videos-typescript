"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("./object");
describe('object Unit Tests', () => {
    it('should not freeze a scalar value', () => {
        const str = (0, object_1.deepFreeze)('a');
        expect(typeof str).toBe('string');
        const num = (0, object_1.deepFreeze)(1);
        expect(typeof num).toBe('number');
        const boolean = (0, object_1.deepFreeze)(true);
        expect(typeof boolean).toBe('boolean');
    });
    it('should must be a immutable object', () => {
        const obj = (0, object_1.deepFreeze)({
            prop1: 'value1', deep: { prop2: 'value2', prop3: new Date() }
        });
        expect(() => { obj.prop1 = 'other value 1'; })
            .toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");
        expect(() => { obj.deep.prop2 = 'other value 2'; })
            .toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");
        expect(obj.deep.prop3).toBeInstanceOf(Date);
    });
});
