import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { In, Repository } from 'typeorm';
import { BEZOS_RELATED_COMPANIES, COMPANY_TRANSACTIONS_URL } from '../constants';
import { HttpService } from '@nestjs/axios';
import { PubSub } from 'graphql-subscriptions';
import {
  IMappedTransaction,
  IOriginalTransaction,
} from './dto/transaction.input';



@Injectable()
export class TransactionsService {
  private readonly logger = new Logger(TransactionsService.name);
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        private httpService: HttpService,
        @Inject('PUB_SUB') private readonly pubSub: PubSub,
      ) {}

      async findAll(): Promise<Transaction[]> {
        return await this.transactionRepository.find({ order: { id: 'ASC' } });
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

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    this.logger.debug('========Called when the current second is 10========');
    const response = await this.httpService
      .get<IOriginalTransaction[]>(COMPANY_TRANSACTIONS_URL)
      .toPromise();
    const existingData = await this.transactionRepository.find({
      where: { id: In(response.data.map((item) => item.id)) },
    });
    const data: IMappedTransaction[] = response.data.reduce(
      (prev: IMappedTransaction[], curr: IOriginalTransaction) => {
        if (existingData.some((oldItem) => oldItem.id === curr.id)) return prev;
        return prev.concat({
          ...curr,
          isFollowed: BEZOS_RELATED_COMPANIES.includes(curr.merchant_name),
        });
      },
      [],
    );
    if (!data.length) {
      this.logger.verbose('Not found new data to insert into db');
      return;
    }
    await this.transactionRepository.insert(data);
    this.logger.verbose(`Inserted data: ${data.length}`);
    const transactionsAdded = await this.transactionRepository.find({
      where: { id: In(data.map((item) => item.id)) },
      order: { id: 'ASC' },
    });
    await this.pubSub.publish('transactionsAdded', {
      transactionsAdded,
    });
  }

}
