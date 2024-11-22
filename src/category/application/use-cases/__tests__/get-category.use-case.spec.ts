import { Category } from "#category/domain/entities/category"
import CategoryInMemoryRepository from "#category/infra/repository/category-in-memory.repository"
import NotFoundError from "#seedwork/domain/errors/not-found.error"
import GetCategoryUseCase from "../get-category.use-case"

describe('GetCategoryUseCase Unit Tests', () => {
    let useCase: GetCategoryUseCase
    let repository: CategoryInMemoryRepository

    beforeEach(() => {
        repository = new CategoryInMemoryRepository()
        useCase = new GetCategoryUseCase(repository)
    })

    it('should throws error when entity not found', async () => {
       expect(() => useCase.execute({id: 'fake id'}))
        .rejects.toThrow(new NotFoundError(`Entity not found using ID fake id`)) 
    })

    it('should returns a category', async () => {
        const items = [
            new Category({name: 'movie'})
        ]
        repository.items = items

        const spyFindById = jest.spyOn(repository, 'findById')
        const output = await useCase.execute({ id: items[0].id})

        expect(spyFindById).toHaveBeenCalledTimes(1)
        expect(output).toStrictEqual({
            id: repository.items[0].id,
            name: 'movie',
            description: null,
            is_active: true,
            created_at: repository.items[0].created_at
  
        })

        
    })
})