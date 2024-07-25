import { User } from './entities/users.entity';
import { UserService } from './users.service';
import { IContext } from 'src/commons/interfaces/context';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    fetchUser(context: IContext): string;
    createUser(email: string, password: string, name: string, age: number): Promise<User>;
}
