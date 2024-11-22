"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_repository_1 = __importDefault(require("#category/domain/repository/category.repository"));
const pagination_output_1 = require("#seedwork/application/dto/pagination-output");
const category_output_1 = require("../dto/category-output");
class ListCategoriesUseCase {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async execute(input) {
        const params = new category_repository_1.default.SearchParams(input);
        const searchResult = await this.categoryRepo.search(params);
        return this.toOutput(searchResult);
    }
    toOutput(searchResult) {
        const items = searchResult.items.map((i) => {
            return category_output_1.CategoryOutputMapper.toOutput(i);
        });
        const pagination = pagination_output_1.PaginationOutputMapper.toOutput(searchResult);
        return Object.assign({ items }, pagination);
    }
}
exports.default = ListCategoriesUseCase;
