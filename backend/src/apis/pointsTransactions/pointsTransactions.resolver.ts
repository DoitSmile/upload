import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointsTransactionsService } from './pointTransactions.service';
import { IContext } from 'src/commons/interfaces/context';
import { ApolloServer } from 'apollo-server-express';

// index.js

@Resolver()
export class PointsTransactionsResolver {
    constructor(
        private readonly pointsTransactionsService: PointsTransactionsService,
    ) {}

    @UseGuards(GqlAuthGuard('access'))
    @Mutation(() => PointTransaction)
    createPointTransaction(
        @Args('impUid') impUid: string, //
        @Args({ name: 'amount', type: () => Int }) amount: number,
        @Context() context: IContext,
    ): Promise<PointTransaction> {
        // db에 저장하고 받아오기때문에 기다려야함, <Promise> 사용
        const user = context.req.user;
        return this.pointsTransactionsService.create({ impUid, amount, user });
    }
}
