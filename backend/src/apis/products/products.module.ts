import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProductResolver, ProductsService],
})
export class ProductsModule {}
