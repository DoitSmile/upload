import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserResolver, UserService],
    exports: [UserService], // auth에서 사용해야므로 내보내줌
})
export class UsersModule {}
