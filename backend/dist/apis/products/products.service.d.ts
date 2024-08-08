import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { IProductServiceCheckSoldout, IProductsServiceCreate, IProductsServiceDelete, IProductsServiceFindOne, IProductsServiceUpdate } from './interfaces/products-service.interface';
export declare class ProductsService {
    private readonly prodcutsRepository;
    constructor(prodcutsRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    findOne({ productId }: IProductsServiceFindOne): Promise<Product>;
    create({ createProductInput }: IProductsServiceCreate): Promise<Product>;
    update({ productId, updateProductInput, }: IProductsServiceUpdate): Promise<Product>;
    checkSoldout({ product }: IProductServiceCheckSoldout): void;
    delete({ productId }: IProductsServiceDelete): Promise<boolean>;
}
