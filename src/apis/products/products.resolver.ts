import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { ProductsService } from './products.service';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver()
export class ProductResolver {
    constructor(private readonly productsService: ProductsService) {}

    @Query(() => [Product])
    fetchProducts(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Query(() => Product)
    fetchProduct(@Args('productId') productId: string): Promise<Product> {
        return this.productsService.findOne({ productId });
    }

    @Mutation(() => Product)
    createProduct(
        @Args('createProductInput') createProductInput: CreateProductInput,
    ): Promise<Product> {
        // 저장된 객체 그대로 돌려보내주기 -> 프론트엔드 개발자들이 브라우저에 임시저장(캐시) 해놓을 수 있다.
        return this.productsService.create({ createProductInput });
    }

    @Mutation(() => Product)
    async updateProduct(
        @Args('productId') productId: string, // 수정 조건
        @Args('UpdateProductInput') updateProductInput: UpdateProductInput, // 수정 대상
    ): Promise<Product> {
        return this.productsService.update({ productId, updateProductInput });
    }

    @Mutation(() => Boolean)
    deleteProduct(@Args('productId') productId: string): Promise<boolean> {
        return this.productsService.delete({ productId }); // productId는 삭제 조건
    }
}
