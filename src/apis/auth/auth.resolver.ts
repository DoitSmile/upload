import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { IContext } from 'src/commons/interfaces/context';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => String)
    async login(
        @Args('email') email: string,
        @Args('password') password: string,
        @Context() context: IContext,
    ): Promise<string> {
        //accessToken을 return 받음
        return await this.authService.login({ email, password, context });
    }

    @UseGuards(GqlAuthGuard('refresh'))
    @Mutation(() => String)
    restoreAccessToken(@Context() context: IContext): string {
        // context : request 요청에 포함된 Headers 등의 내용들이 담겨져 있습니다.
        // context는 guard에서 만들음 (graphql에서만 해당)
        return this.authService.restoreAccessToken({ user: context.req.user });
    }
}
