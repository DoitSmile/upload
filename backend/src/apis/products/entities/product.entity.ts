import { Field, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategorys/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from 'src/apis/productsTags/entites/productTag.entity';
import { User } from 'src/apis/users/entities/users.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
// class가 실행될 때, typeorm에 의해 entity 테이블을 만들어 준다.
export class Product {
    @PrimaryGeneratedColumn('uuid') // 자동으로 생성될 값의 컬럼
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    description: string;

    @Column()
    @Field(() => String)
    price: number;

    @Column({ default: false })
    @Field(() => Boolean) // @Column({ type : ‘text’ }) : 빈 괄호로 둘 경우 default값이 기본
    isSoldout: boolean;

    @JoinColumn()
    @OneToOne(() => ProductSaleslocation) // ProductSaleslocation의 타입은 class 자체이기에 import 해옴
    @Field(() => ProductSaleslocation)
    productSaleslocation: ProductSaleslocation;

    @ManyToOne(() => ProductCategory)
    @Field(() => ProductCategory)
    productCategory: ProductCategory;

    @ManyToOne(() => User)
    @Field(() => User)
    user: User;

    @JoinTable()
    @ManyToMany(() => ProductTag, (productTags) => productTags.products) // 중간테이블
    @Field(() => [ProductTag])
    productTags: ProductTag[];

    // 기본 삭제 컬럼
    // @Column({ default: false })
    // @Field(() => Boolean)
    // isDeleted: boolean;

    // 삭제 정보 컬럼 (삭제된 날짜, 삭제 여부)
    // @Column({ nullable: true })
    // @Field(() => Date)
    // deletedAt: Date;

    @DeleteDateColumn() // 옵션 따로 적어주지 않으면 기본값으로 삭제된 시간을 datetime타입으로 저장
    // 직접 구현과는 다르게, 데이터를 조회할 때 조건을 주지 않아도 삭제 되지 않은 데이터만 조회됨
    deletedAt: Date;
}
