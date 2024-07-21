import { Module } from '@nestjs/common';
import { UsersModule } from '../users/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule.register({}), UsersModule], // UserServie를 사용하기 위해 UsersModule을 불러옴
    providers: [AuthResolver, AuthService],
})
export class AuthModule {}
