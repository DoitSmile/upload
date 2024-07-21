import { User } from 'src/apis/users/entities/users.entity';

export interface IAuthService {
    email: string;
    password: string;
}

export interface IAuthServiceGetAccessToken {
    user: User; // 해당 user의 id를 가지고 올 것이기에 User 타입으로 지정해줌
}
