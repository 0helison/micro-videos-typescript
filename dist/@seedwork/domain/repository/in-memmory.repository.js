"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemorySearchableRepository = exports.InMemoryRepository = void 0;
const not_found_error_1 = __importDefault(require("../errors/not-found.error"));
const repository_contracts_1 = require("./repository-contracts");
class InMemoryRepository {
    constructor() {
        this.items = [];
    }
    async insert(entity) {
        this.items.push(entity);
    }
    async findById(id) {
        const _id = `${id}`;
        return this._get(_id);
    }
    async findAll() {
        return this.items;
    }
    async update(entity) {
        await this._get(entity.id);
        const indexFound = this.items.findIndex(i => i.id === entity.id);
        this.items[indexFound] = entity;
    }
    async delete(id) {
        const _id = `${id}`;
        await this._get(_id);
        const indexFound = this.items.findIndex(i => i.id === _id);
        this.items.splice(indexFound, 1);
    }
    async _get(id) {
        const item = this.items.find(item => item.id === id);
        if (!item) {
            throw new not_found_error_1.default(`Entity not found using ID ${id}`);
        }
        return item;
    }
}
exports.InMemoryRepository = InMemoryRepository;
class InMemorySearchableRepository extends InMemoryRepository {
    constructor() {
        super(...arguments);
        this.sortableFields = [];
    }
    async search(props) {
        const itemsFiltered = await this.applyFilter(this.items, props.filter);
        const itemsSorted = await this.applySort(itemsFiltered, props.sort, props.sort_dir);
        const itemsPaginated = await this.applyPaginate(itemsSorted, props.page, props.per_page);
        return new repository_contracts_1.SearchResult({
            items: itemsPaginated,
            total: itemsFiltered.length,
            current_page: props.page,
            per_page: props.per_page,
            sort: props.sort,
            sort_dir: props.sort_dir,
            filter: props.filter
        });
    }
    async applySort(items, sort, sort_dir) {
        if (!sort || !this.sortableFields.includes(sort)) {
            return items;
        }
        return [...items].sort((a, b) => {
            if (a.props[sort] < b.props[sort]) {
                return sort_dir === 'asc' ? -1 : 1;
            }
            if (a.props[sort] > b.props[sort]) {
                return sort_dir === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }
    async applyPaginate(items, page, per_page) {
        const start = (page - 1) * per_page; // 1 * 15 = 15
        const limit = start + per_page; // 15 + 15 = 30
        return items.slice(start, limit);
    }
}
exports.InMemorySearchableRepository = InMemorySearchableRepository;
