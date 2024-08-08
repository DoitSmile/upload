import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import {
    IProductServiceCheckSoldout,
    IProductsServiceCreate,
    IProductsServiceDelete,
    IProductsServiceFindOne,
    IProductsServiceUpdate,
} from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
    constructor(
        // 데이터 베이스에 저장하기 위해 연결해주는 부분 주입
        @InjectRepository(Product)
        private readonly prodcutsRepository: Repository<Product>, //Repository == db
    ) {}

    findAll(): Promise<Product[]> {
        return this.prodcutsRepository.find();
    }

    findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
        return this.prodcutsRepository.findOne({ where: { id: productId } });
    }

    create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
        const result = this.prodcutsRepository.save({
            ...createProductInput,
        });
        return result;
    }

    async update({
        productId,
        updateProductInput,
    }: IProductsServiceUpdate): Promise<Product> {
        const product = await this.findOne({ productId });
        // 결과를 객체로 돌려받기 위해 findeOne 사용
        // this.productsRepository.findOne  == this.findOne

        this.checkSoldout({ product });

        // .save: 데이터를 수정하고, 수정한 결과를 찾아오기까지 한다.
        // 수정시 save을 사용하기 위해서는 먼저 데이터를 찾아와야 사용 가능
        // 위의 경우, 데이터를 수정한 뒤 어떤 데이터가 수정되었는지 프론트에 보내기 위해 save를 사용하였다.

        const result = this.prodcutsRepository.save({
            ...product, // 수정 후 수정되지 않은 다른 결과 값 까지 모두 받고 싶을 때 사용
            ...updateProductInput,
        });
        return result;
    }
    // this.productsRepository.create() // DB 접속이랑 관련 없음. 등록을 위해서 빈 껍데기 객체 만들기 위함
    // this.productsRepository.insert() // 결과를 객체로 못 돌려받는 등록 방법
    // this.productsRepository.update() // 결과를 객체로 못 돌려받는 수정 방법

    checkSoldout({ product }: IProductServiceCheckSoldout): void {
        if (product.isSoldout)
            throw new UnprocessableEntityException(
                '이미 판매 완료된 제품입니다.',
            ); // 이미 판매 완료가 된 상품이라면 프론트로 에러 메세지를 보내줌
    }

    async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
        // 1. 실제 삭제
        // const result = await this.prodcutsRepository.delete({ id: productId });
        // return result.affected ? true : false;
        // // affected: 삭제가 이루어졌는지 확인가능
        // // 삭제가 이루어진 게 있다면 true, 없다면 false를 프론트로 리턴해준다
        // 2. 소프트 삭제(직접 구현) - isDeleted
        // this.productsRepository.update({ id: productId }, { isDeleted: true })
        // 3. 소프트 삭제(직접 구현) - deletedAt
        // const result = this.prodcutsRepository.update(
        //     { id: productId },
        //     { deletedAt: new Date() },
        // );

        // 4. 소프트 삭제(TypeORM 제공) - softRemove
        // this.productsRepository.softRemove({ id: productId }); // 단점: id로만 삭제 가능
        //                                                        // 장점: 여러ID 한번에 지우기도 가능 => .softRemove([{id: qqq}, {id: aaa}])

        // 5. 소프트 삭제(TypeORM 제공) - softDelete
        // 장점: 다른 컬럼명으로도 삭제 가능( 여러 행 삭제 가능)
        // 단점: 여러ID 한번에 지우기 불가능
        const result = await this.prodcutsRepository.softDelete({
            id: productId,
        });
        return result.affected ? true : false;
        // affected에 삭제된 행의 갯수가 숫자로 들어있음
    }
}
