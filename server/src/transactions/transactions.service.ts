import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import {
  IMappedTransaction,
  IOriginalTransaction,
} from './dto/transaction.input';
import { BEZOS_RELATED_COMPANIES } from '../constants';


@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
      ) {}

      findAll(): Promise<Transaction[]> {
        return this.transactionRepository.find({ order: { id: 'ASC' } });
      }

      async update({
        merchant_name,
        isFollowed,
      }: {
        merchant_name: string;
        isFollowed: boolean;
      }) {
        await this.transactionRepository.update({ merchant_name }, { isFollowed });
        return this.transactionRepository.find({ order: { id: 'ASC' } });
      }

}
