import { Category } from "#category/domain/entities/category"
import { CategoryOutputMapper } from "./category-output"

describe('CategoryOutputMapper  Unit Test', () => {
    it('should convert a category in output', () => {
        const created_at = new Date()
        const entity = new Category({
            name: 'Movie',
            description: 'some description',
            is_active: true,
            created_at
        })
        const spyToJSON = jest.spyOn(entity, 'toJSON')
        const output = CategoryOutputMapper.toOutput(entity)

        expect(spyToJSON).toHaveBeenCalled()
        expect(output).toStrictEqual({
            id: entity.id,
            name: entity.name,
            description: entity.description,
            is_active: entity.is_active,
            created_at: entity.created_at
        })
    })
})