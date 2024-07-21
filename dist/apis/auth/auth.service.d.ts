import { UserService } from '../users/users.service';
import { IAuthService, IAuthServiceGetAccessToken } from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login({ email, password }: IAuthService): Promise<string>;
    getAccessToken({ user }: IAuthServiceGetAccessToken): string;
}
