import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';


@Resolver(() => Transaction)
export class TransactionsResolver {
    constructor(
        private readonly transactionsService: TransactionsService,
      ) {}

      @Query(() => [Transaction], { name: 'transactions' })
      findAll() {
        return this.transactionsService.findAll();
      }

}