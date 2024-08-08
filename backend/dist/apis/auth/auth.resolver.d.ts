import { AuthService } from './auth.service';
import { IContext } from 'src/commons/interfaces/context';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(email: string, password: string, context: IContext): Promise<string>;
    restoreAccessToken(context: IContext): string;
}
