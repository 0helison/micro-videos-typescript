import { Category } from "#category/domain/entities/category"
import CategoryInMemoryRepository from "#category/infra/repository/category-in-memory.repository"
import NotFoundError from "#seedwork/domain/errors/not-found.error"
import UpdateCategoryUseCase from "../update-category.use-case"

describe('UpdateCategoryUseCase Unit Tests', () => {
    let useCase: UpdateCategoryUseCase
    let repository: CategoryInMemoryRepository

    beforeEach(() => {
        repository = new CategoryInMemoryRepository()
        useCase = new UpdateCategoryUseCase(repository)
    })

    it('should throws error when entity not found', async () => {
        expect(() => useCase.execute({id: 'fake id', name: 'Movie'}))
         .rejects.toThrow(new NotFoundError(`Entity not found using ID fake id`)) 
     })

    it('should update a category', async () => {
        const spyUpdate = jest.spyOn(repository, 'update')
        const entity = new Category({name: 'Movie'})
        repository.insert(entity)
        let output = await useCase.execute({id: entity.id, name: 'test'})

        expect(spyUpdate).toHaveBeenCalledTimes(1)
        expect(output).toStrictEqual({
            id: entity.id,
            name: 'test',
            description: null,
            is_active: true,
            created_at: entity.created_at
        })

        output = await useCase.execute({id: entity.id, name: 'test', description: 'some description'})

        expect(output).toStrictEqual({
            id: entity.id,
            name: 'test',
            description: 'some description',
            is_active: true,
            created_at: entity.created_at
        })

        output = await useCase.execute({id: entity.id, name: 'test'})

        expect(output).toStrictEqual({
            id: entity.id,
            name: 'test',
            description: null,
            is_active: true,
            created_at: entity.created_at
        })

        output = await useCase.execute({id: entity.id, name: 'test', is_active: false})

        expect(output).toStrictEqual({
            id: entity.id,
            name: 'test',
            description: null,
            is_active: false,
            created_at: entity.created_at
        })

        output = await useCase.execute({id: entity.id, name: 'test'})

        expect(output).toStrictEqual({
            id: entity.id,
            name: 'test',
            description: null,
            is_active: false,
            created_at: entity.created_at
        })

        output = await useCase.execute({id: entity.id, name: 'test', is_active: true})

        expect(output).toStrictEqual({
            id: entity.id,
            name: 'test',
            description: null,
            is_active: true,
            created_at: entity.created_at
        })

        output = await useCase.execute({id: entity.id, name: 'test', description: 'some description', is_active: false})

        expect(output).toStrictEqual({
            id: entity.id,
            name: 'test',
            description: 'some description',
            is_active: false,
            created_at: entity.created_at
        })
    })
})