"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("typeorm");
let ProductsService = class ProductsService {
    constructor(prodcutsRepository) {
        this.prodcutsRepository = prodcutsRepository;
    }
    findAll() {
        return this.prodcutsRepository.find();
    }
    findOne({ productId }) {
        return this.prodcutsRepository.findOne({ where: { id: productId } });
    }
    create({ createProductInput }) {
        const result = this.prodcutsRepository.save({
            ...createProductInput,
        });
        return result;
    }
    async update({ productId, updateProductInput, }) {
        const product = await this.findOne({ productId });
        this.checkSoldout({ product });
        const result = this.prodcutsRepository.save({
            ...product,
            ...updateProductInput,
        });
        return result;
    }
    checkSoldout({ product }) {
        if (product.isSoldout)
            throw new common_1.UnprocessableEntityException('이미 판매 완료된 제품입니다.');
    }
    async delete({ productId }) {
        const result = await this.prodcutsRepository.softDelete({
            id: productId,
        });
        return result.affected ? true : false;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map