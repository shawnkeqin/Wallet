import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { UpdateTransactionInput } from './dto/transaction.input';
import { Transaction } from './entities/transaction.entity';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';


@Resolver(() => Transaction)
export class TransactionsResolver {
    constructor(
        private readonly transactionsService: TransactionsService,
        @Inject('PUB_SUB') private readonly pubSub: PubSub,
      ) {}

      @Query(() => [Transaction], { name: 'transactions' })
      findAll() {
        return this.transactionsService.findAll();
      }

      @Mutation(() => [Transaction])
      updateTransaction(
        @Args('updateInput')
        updateInput: UpdateTransactionInput,
      ) {
        return this.transactionsService.update(updateInput);
      }

      @Subscription(() => [Transaction], { nullable: true })
      async transactionsAdded() {
        return this.pubSub.asyncIterator<Transaction>('transactionsAdded');
      }

}