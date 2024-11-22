"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_validator_1 = __importStar(require("./category.validator"));
describe('Category Validator Tests', () => {
    let validator;
    beforeEach(() => validator = category_validator_1.default.create());
    test('invalidation cases for name field', () => {
        expect({ validator, data: null }).containsErrorMessages({
            name: [
                'name should not be empty',
                'name must be a string',
                'name must be shorter than or equal to 255 characters'
            ]
        });
        let isValid = validator.validate(null);
        expect(isValid).toBeFalsy();
        expect(validator.errors['name']).toStrictEqual([
            'name should not be empty',
            'name must be a string',
            'name must be shorter than or equal to 255 characters'
        ]);
        isValid = validator.validate({ name: '' });
        expect(isValid).toBeFalsy();
        expect(validator.errors['name']).toStrictEqual([
            'name should not be empty',
        ]);
        isValid = validator.validate({ name: 5 });
        expect(isValid).toBeFalsy();
        expect(validator.errors['name']).toStrictEqual([
            'name must be a string',
            'name must be shorter than or equal to 255 characters'
        ]);
        isValid = validator.validate({ name: 'p'.repeat(256) });
        expect(isValid).toBeFalsy();
        expect(validator.errors['name']).toStrictEqual([
            'name must be shorter than or equal to 255 characters'
        ]);
    });
    test('validation cases for fields', () => {
        const arrange = [
            { name: 'things' },
            { name: 'things', description: null },
            { name: 'things', description: undefined },
            { name: 'things', is_active: true },
            { name: 'things', is_active: false },
        ];
        arrange.forEach((i) => {
            const isValid = validator.validate(i);
            expect(isValid).toBeTruthy();
            expect(validator.validatedData).toStrictEqual(new category_validator_1.CategoryRules(i));
        });
    });
});
