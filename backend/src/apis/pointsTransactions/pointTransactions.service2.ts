// pointTransactions.service2.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import {
    PointTransaction,
    POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';
import { IPointsTransactionsServiceCreate } from './interfaces/points-transactions-service.interface';
import { User } from '../users/entities/users.entity';

@Injectable()
export class PointsTransactionsService {
    constructor(
        @InjectRepository(PointTransaction)
        private readonly pointsTransactionsRepository: Repository<PointTransaction>,

        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,

        private readonly dataSource: DataSource,
    ) {}

    async create({
        impUid,
        amount,
        user: _user,
    }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
        // this.pointsTransactionsRepository.create(); // 등록을 위한 빈 객체 만들기
        // this.pointsTransactionsRepository.insert(); // 결과는 못 받는 등록 방법
        // this.pointsTransactionsRepository.update(); // 결과는 못 받는 수정 방법

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction('SERIALIZABLE');
        try {
            // 1. PointTransaction 테이블에 거래기록 1줄 생성
            const pointTransaction = this.pointsTransactionsRepository.create({
                impUid,
                amount,
                user: _user,
                status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
            });
            // await this.pointsTransactionsRepository.save(pointTransaction);
            await queryRunner.manager.save(pointTransaction); // queryRunner를 통해서 저장해야만 트랜잭션 먹힘

            // 2. 유저의 돈 찾아오기
            // const user = await this.usersRepository.findOne({
            //   where: { id: _user.id },
            // });
            const user = await queryRunner.manager.findOne(User, {
                where: { id: _user.id }, // row-lock
                lock: { mode: 'pessimistic_write' },
            });

            // 3. 유저의 돈 업데이트하기
            // await this.usersRepository.update(
            //   { id: _user.id },
            //   { point: user.point + amount },
            // );
            const updatedUser = this.usersRepository.create({
                ...user,
                point: user.point + amount,
            });
            await queryRunner.manager.save(updatedUser);
            await queryRunner.commitTransaction();

            // 4. 최종결과 브라우저에 돌려주기
            return pointTransaction;
        } catch (error) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release(); // 주석걸면, commit 끝나도 커넥션이 안 끊겨서 문제됨 (하지만, 에러나면 자동끊김)
        }
    }
}
