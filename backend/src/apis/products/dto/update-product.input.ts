import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';

@InputType()
// 특정 데이터만 수정을 해야할 때도 존재하게 됩니다.
// nullable: true  를 사용하여 해당 값을 꼭 입력하지 않아도 API이 실행이 가능하게 함
export class UpdateProductInput extends PartialType(CreateProductInput) {}
// PartialType : 모든 컬럼을 선택사항으로 바꿔주는 역할, nullable: true와 같은 역할을 함
