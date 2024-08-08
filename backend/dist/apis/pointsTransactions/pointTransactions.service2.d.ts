import { DataSource, Repository } from 'typeorm';
import { PointTransaction } from './entities/pointTransaction.entity';
import { IPointsTransactionsServiceCreate } from './interfaces/points-transactions-service.interface';
import { User } from '../users/entities/users.entity';
export declare class PointsTransactionsService {
    private readonly pointsTransactionsRepository;
    private readonly usersRepository;
    private readonly dataSource;
    constructor(pointsTransactionsRepository: Repository<PointTransaction>, usersRepository: Repository<User>, dataSource: DataSource);
    create({ impUid, amount, user: _user, }: IPointsTransactionsServiceCreate): Promise<PointTransaction>;
}
