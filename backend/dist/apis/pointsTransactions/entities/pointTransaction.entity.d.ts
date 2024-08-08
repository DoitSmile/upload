import { User } from 'src/apis/users/entities/users.entity';
export declare enum POINT_TRANSACTION_STATUS_ENUM {
    PAYMENT = "PAYMENT",
    CANCEL = "CANCEL"
}
export declare class PointTransaction {
    id: string;
    impUid: string;
    amount: number;
    status: POINT_TRANSACTION_STATUS_ENUM;
    user: User;
    createdAt: Date;
}
