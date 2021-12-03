import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { HttpModule } from '@nestjs/axios';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Transaction])],
  providers: [
    TransactionsResolver,
    TransactionsService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class TransactionsModule {}
