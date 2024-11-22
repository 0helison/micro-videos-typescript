import { Category } from "#category/domain/entities/category"
import CategoryInMemoryRepository from "#category/infra/repository/category-in-memory.repository"
import NotFoundError from "#seedwork/domain/errors/not-found.error"
import DeleteCategoryUseCase from "../delete-category.use-case"

describe('DeleteCategoryUseCase Unit Tests', () => {
    let useCase: DeleteCategoryUseCase
    let repository: CategoryInMemoryRepository

    beforeEach(() => {
        repository = new CategoryInMemoryRepository()
        useCase = new DeleteCategoryUseCase(repository)
    })

    it('should throws error when entity not found', async () => {
       expect(() => useCase.execute({id: 'fake id'}))
        .rejects.toThrow(new NotFoundError(`Entity not found using ID fake id`)) 
    })

    it('should delete a category', async () => {
        const items = [
            new Category({name: 'movie'})
        ]
        repository.items = items

        const spyDelete = jest.spyOn(repository, 'delete')
        await useCase.execute({ id: items[0].id})

        expect(spyDelete).toHaveBeenCalledTimes(1)
        expect(repository.items).toHaveLength(0)
    })
})