import { InputType, Field } from '@nestjs/graphql';
// @ts-ignore
import { Transaction } from '../entities/transaction.entity';

@InputType()
export class UpdateTransactionInput {
  @Field()
  merchant_name: string;

  @Field(() => Boolean)
  isFollowed: boolean;
}

export type IOriginalTransaction = Pick<
  IMappedTransaction,
  'id' | 'amount' | 'category' | 'date' | 'merchant_name'
>;

export type IMappedTransaction = Pick<
  Transaction,
  'id' | 'amount' | 'category' | 'date' | 'merchant_name' | 'isFollowed'
>;