"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const unique_entity_id_vo_1 = __importDefault(require("../unique-entity-id-vo"));
const invalid_uuid_error_1 = __importDefault(require("#seedwork/domain/errors/invalid-uuid-error"));
describe('UniqueEntityId Unit Tests', () => {
    let validateSpy;
    beforeEach(() => {
        validateSpy = jest.spyOn(unique_entity_id_vo_1.default.prototype, 'validate');
    });
    it('should throw error when uuid is invalid', () => {
        expect(() => new unique_entity_id_vo_1.default('fake id')).toThrow(new invalid_uuid_error_1.default());
        expect(validateSpy).toHaveBeenCalled();
    });
    it('should accept a uuid passed in constructor', () => {
        const uuid = 'fcaaf2ec-ce81-4481-8edb-3d7bf26b3e34';
        const vo = new unique_entity_id_vo_1.default(uuid);
        expect(vo.value).toBe(uuid);
        expect(validateSpy).toHaveBeenCalled(); // garante que validate está sendo chamado
    });
    it('should generate a valid uuid when no uuid is passed', () => {
        const vo = new unique_entity_id_vo_1.default();
        expect((0, uuid_1.validate)(vo.value)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    });
});
