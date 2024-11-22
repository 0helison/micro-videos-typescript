"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const category_validator_1 = __importDefault(require("#category/validators/category.validator"));
const entity_1 = __importDefault(require("#seedwork/domain/entity/entity"));
const validation_error_1 = require("#seedwork/domain/errors/validation-error");
class Category extends entity_1.default {
    constructor(props, id) {
        var _a;
        Category.validate(props);
        super(props, id);
        this.props = props;
        this.description = this.props.description;
        this.is_active = this.props.is_active;
        this.props.created_at = (_a = this.props.created_at) !== null && _a !== void 0 ? _a : new Date();
    }
    update(name, description) {
        Category.validate({
            name,
            description
        });
        this.name = name;
        this.description = description;
    }
    //static validate(props: Omit<CategoryProperties, 'id' | 'created_at'>){
    //    ValidatorRules.values(props.name, 'name').required().string().maxLength(255)
    //    ValidatorRules.values(props.description, 'description').string()
    //    ValidatorRules.values(props.is_active, 'is_active').boolean()
    //}
    static validate(props) {
        const validator = category_validator_1.default.create();
        const isValid = validator.validate(props);
        if (!isValid) {
            throw new validation_error_1.EntityValidationError(validator.errors);
        }
    }
    activate() {
        this.is_active = true;
    }
    desactivate() {
        this.is_active = false;
    }
    get name() {
        return this.props.name;
    }
    set name(value) {
        this.props.name = value;
    }
    get description() {
        return this.props.description;
    }
    set description(value) {
        this.props.description = value !== null && value !== void 0 ? value : null;
    }
    get is_active() {
        return this.props.is_active;
    }
    set is_active(value) {
        this.props.is_active = value !== null && value !== void 0 ? value : true;
    }
    get created_at() {
        return this.props.created_at;
    }
}
exports.Category = Category;
