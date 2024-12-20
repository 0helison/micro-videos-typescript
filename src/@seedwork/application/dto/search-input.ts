import { SortDirection } from "#seedwork/domain/repository/repository-contracts"

export type Filter = string

export type SearchInputDTO<Filter = string> = {
    page?: number
    per_page?: number
    sort?: string | null 
    sort_dir?: SortDirection | null
    filter?: Filter | null
}