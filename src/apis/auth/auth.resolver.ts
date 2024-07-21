import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => String)
    async login(
        @Args('email') email: string,
        @Args('password') password: string,
    ): Promise<string> {
        //accessToken을 return 받음
        return await this.authService.login({ email, password });
    }
}
