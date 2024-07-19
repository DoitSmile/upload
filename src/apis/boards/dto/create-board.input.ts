import { Field, InputType } from '@nestjs/graphql';

// dto : 네트워크 간에 데이터를 어떤 식으로 보낼지 정의한 객체
@InputType()
export class CreateBoardInput {
    @Field(() => String)
    writer: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    contents: string;
}
