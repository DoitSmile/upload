import { DataSource, Repository } from 'typeorm';
import { PointTransaction } from './entities/pointTransaction.entity';
import { IPointsTransactionsServiceCreate } from './interfaces/points-transactions-service.interface';
export declare class PointsTransactionsService {
    private readonly pointsTransactionsRepository;
    private readonly dataSource;
    constructor(pointsTransactionsRepository: Repository<PointTransaction>, dataSource: DataSource);
    create({ impUid, amount, user: _user, }: IPointsTransactionsServiceCreate): Promise<PointTransaction>;
}
