import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { IUserCreate, IUserServiceFindOneByEmail } from './interfaces/users-service.interface';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findOneByEmail({ email }: IUserServiceFindOneByEmail): Promise<User>;
    create({ email, password, name, age }: IUserCreate): Promise<User>;
}
