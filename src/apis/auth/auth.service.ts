import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {
    IAuthService,
    IAuthServiceGetAccessToken,
} from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login({ email, password }: IAuthService): Promise<string> {
        const user = await this.userService.findOneByEmail({ email });
        //.compare(로그인시입력한비번,db에저장된비번): bcrypt의 해시 전과 해시 후를 비교해주는 함수
        if (!user) throw new UnprocessableEntityException('이메일이 없습니다.'); // 422 error
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth)
            throw new UnprocessableEntityException(
                '비밀번호가 일치하지 않습니다.',
            );
        return this.getAccessToken({ user });
    }

    getAccessToken({ user }: IAuthServiceGetAccessToken): string {
        // JwtService를 사용하여 토큰이 바로 생성되기에 async ~ await는 사용하지 않음
        return this.jwtService.sign(
            { sub: user.id },
            { secret: '내비밀번호', expiresIn: '1h' },
        );
    }
}
