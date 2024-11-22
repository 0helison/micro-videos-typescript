import { validate as uuidValidate } from "uuid";
import UniqueEntityId from "../unique-entity-id-vo";
import InvalidUuidError from "#seedwork/domain/errors/invalid-uuid-error";

describe('UniqueEntityId Unit Tests', () => {

    let validateSpy: jest.SpyInstance;

    beforeEach(() => {
        validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    });

    it('should throw error when uuid is invalid', () => {
        expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalled();
    });

    it('should accept a uuid passed in constructor', () => {
        const uuid = 'fcaaf2ec-ce81-4481-8edb-3d7bf26b3e34'
        const vo = new UniqueEntityId(uuid);
        expect(vo.value).toBe(uuid);
        expect(validateSpy).toHaveBeenCalled(); // garante que validate está sendo chamado
    });

    it('should generate a valid uuid when no uuid is passed', () => {
        const vo = new UniqueEntityId();
        expect(uuidValidate(vo.value)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    });
});
