import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/users.entity';
import { UserService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    // @UseGuards(AuthGuard('access')) // UseGuards: 로그인한 유저만 api를 실행시키게 막아줌 / 'access'라는 이름의 방어막
    // GraphQL에서는 @UseGuards(AuthGuard('access'))를 사용할 수 없습니다.
    // GraphQL에서는 req, res를 담고있는 context 객체가 존재
    @UseGuards(GqlAuthGuard('access'))
    @Query(() => String)
    fetchUser(@Context() context: IContext): string {
        console.log('================');
        console.log(context.req.user);
        console.log('================');
        return '인가에 성공했습니다.';
    }

    @Mutation(() => User)
    async createUser(
        @Args('email') email: string,
        @Args('password') password: string,
        @Args('name') name: string,
        @Args('age') age: number,
    ): Promise<User> {
        return await this.userService.create({
            email,
            password,
            name,
            age,
        });
    }
}
