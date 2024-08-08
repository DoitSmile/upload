import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/users.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

export enum POINT_TRANSACTION_STATUS_ENUM {
    PAYMENT = 'PAYMENT',
    CANCEL = 'CANCEL',
}

//graphql에 EnumType 등록해주기
registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
    name: 'POINT_TRANSACTION_STATUS_ENUM',
});

// insert only table (history)
@Entity()
@ObjectType()
export class PointTransaction {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    impUid: string;

    @Column()
    @Field(() => Int)
    amount: number;

    @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM }) //mysql에 알려주기
    @Field(() => POINT_TRANSACTION_STATUS_ENUM) //registerEnumType
    status: POINT_TRANSACTION_STATUS_ENUM;

    @ManyToOne(() => User) // PointTransaction: many, user : one
    @Field(() => User)
    user: User;

    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date;
}
