import { User } from './entities/users.entity';
import { UserService } from './users.service';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    createUser(email: string, password: string, name: string, age: number): Promise<User>;
}
