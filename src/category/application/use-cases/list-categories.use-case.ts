import CategoryRepository from "#category/domain/repository/category.repository"
import { PaginationOutputDTO, PaginationOutputMapper } from "#seedwork/application/dto/pagination-output"
import { SearchInputDTO } from "#seedwork/application/dto/search-input"
import UseCase from "#seedwork/application/use-case"
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output"


export default class ListCategoriesUseCase implements UseCase<Input, Output>{
    constructor(private categoryRepo: CategoryRepository.Repository){}

    async execute(input: Input): Promise<Output>{
        const params = new CategoryRepository.SearchParams(input)
        const searchResult = await this.categoryRepo.search(params)
        
        return this.toOutput(searchResult)
    }

    private toOutput(searchResult: CategoryRepository.SearchResult): Output{
        const items = searchResult.items.map((i) => {
            return CategoryOutputMapper.toOutput(i)
        })

        const pagination = PaginationOutputMapper.toOutput(searchResult) 
        return {
            items,
           ...pagination
        }
    }
}

export type Input = SearchInputDTO

export type Output = PaginationOutputDTO<CategoryOutput>