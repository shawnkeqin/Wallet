import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [],
  providers: [TransactionsService],
})
export class TransactionsModule {}
