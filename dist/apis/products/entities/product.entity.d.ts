import { ProductCategory } from 'src/apis/productsCategorys/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from 'src/apis/productsTags/entites/productTag.entity';
import { User } from 'src/apis/users/entities/users.entity';
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    isSoldout: boolean;
    productSaleslocation: ProductSaleslocation;
    productCategory: ProductCategory;
    user: User;
    productTags: ProductTag[];
    deletedAt: Date;
}
