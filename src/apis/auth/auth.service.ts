import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {
    IAuthService,
    IAuthServiceGetAccessToken,
    IAuthServiceRestoreAccessToken,
    IAuthServiceSetRefreshToken,
} from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login({ email, password, context }: IAuthService): Promise<string> {
        const user = await this.userService.findOneByEmail({ email });
        //.compare(로그인시입력한비번,db에저장된비번): bcrypt의 해시 전과 해시 후를 비교해주는 함수
        if (!user) throw new UnprocessableEntityException('이메일이 없습니다.'); // 422 error
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth)
            throw new UnprocessableEntityException(
                '비밀번호가 일치하지 않습니다.',
            );
        this.setRefreshToken({ user, context }); //refreshToken(=JWT)을 만들어서 브라우저 쿠키에 저장해서 보내주기
        return this.getAccessToken({ user });
    }

    setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
        // refreshToken은 return을 사용해서 프론트로 보내주는 것이 아니라 요청(req)에 대한 응답(res)으로, res 안에 cookie가 들어있는 채로 프론트엔드로 보내주게 됩니다.
        // 즉 refreshToken은 cookie를 통해 받게 되고 accessToken은 payload를 통해 받게된다.
        const refreshToken = this.jwtService.sign(
            { sub: user.id },
            { secret: '나의리프레시비밀번호', expiresIn: '2w' },
        );

        // 개발환경
        context.res.setHeader(
            'set-Cookie',
            `refreshToken=${refreshToken}; path=/;`,
        );

        // 배포환경 -> 보안 옵션 추가 설정 필요
        // context.res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly`);
        // context.res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com');
        //}
    }

    restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
        return this.getAccessToken({ user });
    }

    getAccessToken({ user }: IAuthServiceGetAccessToken): string {
        // JwtService를 사용하여 토큰이 바로 생성되기에 async ~ await는 사용하지 않음
        return this.jwtService.sign(
            { sub: user.id },
            { secret: '나의 비밀번호', expiresIn: '10s' },
        );
    }
}
