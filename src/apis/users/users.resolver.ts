import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './entities/users.entity';
import { UserService } from './users.service';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

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
