// app.module.ts

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/boards/boards.module';
import { ProductsModule } from './apis/products/products.module';
import { UsersModule } from './apis/users/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { PointsTransactionsModule } from './apis/pointsTransactions/pointsTransactions.module';
import { FilesModule } from './apis/files/files.module';

@Module({
    imports: [
        FilesModule,
        PointsTransactionsModule,
        AuthModule,
        UsersModule,
        BoardModule,
        ProductsModule,
        ConfigModule.forRoot(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
            context: ({ req, res }) => ({ req, res }), // 기본적으로 req는 들어오지만 res는 이 작업이 필요
        }),
        TypeOrmModule.forRoot({
            type: process.env.DATABASE_TYPE as 'mysql',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            entities: [__dirname + '/apis/**/*.entity.*'], //현재 파일이 있는 절대경로에서 apis 폴더 안에 끝까지 들어가서,  파일명 중간에 .entity.이 들어간 파일들을 선택한다는 뜻
            synchronize: true,
            logging: true,
        }),
    ],
})
export class AppModule {}
