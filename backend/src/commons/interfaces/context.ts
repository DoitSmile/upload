// context.ts

import { Request, Response } from 'express';

// req를 통해 꺼내온 유저 (인가된 유저)
export interface IAuthUser {
    user?: {
        id: string;
    };
}

export interface IContext {
    req: Request & IAuthUser;
    res: Response;
}
