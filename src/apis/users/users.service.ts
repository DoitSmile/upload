import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import {
    IUserCreate,
    IUserServiceFindOneByEmail,
} from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    findOneByEmail({ email }: IUserServiceFindOneByEmail) {
        return this.userRepository.findOne({ where: { email } });
    }

    async create({ email, password, name, age }: IUserCreate): Promise<User> {
        const user = await this.findOneByEmail({ email }); // 중복 이메일 방지
        if (user) throw new ConflictException('이미 등록된 이메일입니다.');
        const hashedPassword = await bcrypt.hash(password, 10); // 원본 password를 10회 salt 시켜줌
        return this.userRepository.save({
            email,
            password: hashedPassword,
            name,
            age,
        });
    }
}
