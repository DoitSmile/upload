import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

// 입력 값을 설정하는 곳 //object는 리턴받음
@InputType()
export class CreateProductInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;

    @Min(0) // 해당 값 설정 위해 class-validator , class-transformer 라이브러리 설치
    //main.ts의 app.useGlobalPipes를 사용해여 ValidationPipe를 연결시켜 주셔야 합니다.
    @Field(() => Int)
    price: number;
}
