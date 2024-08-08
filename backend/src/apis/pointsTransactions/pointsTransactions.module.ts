import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsTransactionsResolver } from './pointsTransactions.resolver';
import { PointsTransactionsService } from './pointTransactions.service';
import { PointTransaction } from './entities/pointTransaction.entity';
import { User } from '../users/entities/users.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PointTransaction, //
            User,
        ]),
    ],
    providers: [
        PointsTransactionsResolver, //
        PointsTransactionsService,
    ],
})
export class PointsTransactionsModule {}
