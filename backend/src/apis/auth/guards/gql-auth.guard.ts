import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

// 리팩토링 : 반복되는 부분 줄이기
export const GqlAuthGuard = (name) =>
    class GqlAuthGuard extends AuthGuard(name) {
        getRequest(context: ExecutionContext) {
            const gqlContext = GqlExecutionContext.create(context);
            return gqlContext.getContext().req;
        }
    };

// export class GqlAuthAccessGuard extends AuthGuard('access') {
//     getRequest(context: ExecutionContext) {
//         //  rest-api 용도의 함수를 graphql 용도의 함수로 바꿔줍니다(= overriding).
//         const gqlContext = GqlExecutionContext.create(context); //getContext() : GraphQL용 context를 가지고 와서 안에 들어있는 req 정보만 뽑아줍니다.
//         return gqlContext.getContext().req; //return : users.resolver.ts 파일의 GqlAuthAccessGuard 로 리턴 됩니다.
//     }
// }

// export class GqlAuthRefreshGuard extends AuthGuard('refresh') {
//     getRequest(context: ExecutionContext) {
//         const gqlContext = GqlExecutionContext.create(context);
//         return gqlContext.getContext().req;
//     }
// }
