import { UserService } from '../users/users.service';
import { IAuthService, IAuthServiceGetAccessToken, IAuthServiceRestoreAccessToken, IAuthServiceSetRefreshToken } from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login({ email, password, context }: IAuthService): Promise<string>;
    setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void;
    restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string;
    getAccessToken({ user }: IAuthServiceGetAccessToken): string;
}
