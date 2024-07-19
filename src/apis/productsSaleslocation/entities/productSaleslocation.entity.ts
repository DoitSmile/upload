import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductSaleslocation {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    address: string;

    @Column()
    @Field(() => String)
    addressDetail: string;

    // 위도
    @Column({ type: 'decimal', precision: 9, scale: 6 }) // 타입을 decimal로 지정하여 자세한 자릿수를 지정
    @Field(() => Float)
    lat: number;

    //경도
    @Column({ type: 'decimal', precision: 9, scale: 6 })
    @Field(() => Float)
    lng: number;

    @Column()
    @Field(() => Date)
    meetingTime: Date;
}
