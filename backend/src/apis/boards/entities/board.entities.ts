import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Board {
    @PrimaryGeneratedColumn('increment') // TypeScript를 위한
    @Field(() => Int) // graphql을 위한
    number: number; //TypeScript를 위한

    @Column()
    @Field(() => String)
    writer: string;

    @Column()
    @Field(() => String)
    title: string;

    @Column()
    @Field(() => String)
    contents: string;
}
