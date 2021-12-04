import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from '../src/transactions/transactions.module';
import { GraphQLModule } from '@nestjs/graphql';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transaction } from '../src/transactions/entities/transaction.entity';
import { TransactionsService } from '../src/transactions/transactions.service';
import { TransactionsResolver } from '../src/transactions/transactions.resolver';
import { PubSub } from 'graphql-subscriptions';
import { Connection } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockTransactionsRepository = {
    name: 'test'
};

describe('TransactionResolver (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        jest.setTimeout(60000);
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                  }),
                  GraphQLModule.forRoot({
                    autoSchemaFile: true,
                    subscriptions: {
                      'graphql-ws': true,
                      'subscriptions-transport-ws': {
                        path: '/graphql',
                      },
                    },
                  }),
                  ScheduleModule.forRoot(),
                  TypeOrmModule.forRootAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => ({
                      name: 'dev',
                      type: 'postgres',
                      host: configService.get<string>('DB_HOST'),
                      port: +configService.get<string>('DB_PORT'),
                      username: configService.get<string>('DB_USERNAME'),
                      password: configService.get<string>('DB_PASSWORD'),
                      database: configService.get<string>('DB_NAME'),
                      schema: 'public',
                      entities: [Transaction],
                      synchronize: true,
                    }),
                  }),
                  TransactionsModule,
            ],
            providers: [{
                provide: getRepositoryToken(Transaction),
                useValue: mockTransactionsRepository,
              }]
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    it('should create testing module', () => {
        expect(1).toBe(1);
    });

});