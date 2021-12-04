import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { HttpService } from '@nestjs/axios';
import { PubSub } from 'graphql-subscriptions';
import { HttpModule } from '@nestjs/axios';

const mockTransactionsRepository = {};

class TransactionServiceMock {

  findAll(){
    return [];
  }

  update({merchant_name: string, isFollowed: boolean}) {
    return [];
  }
}

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [TransactionsService,{
        provide: 'PUB_SUB',
        useValue: new PubSub(),
        useClass: TransactionServiceMock,
      },
      {
        provide: getRepositoryToken(Transaction),
        useValue: mockTransactionsRepository,
      }
    ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all transactions', async () => {
    const findAllTransactions = jest.spyOn(service, 'findAll');
    service.findAll();
    expect(findAllTransactions).toHaveBeenCalledWith();
  });

  it('should update Transaction with expected params', async () => {
    const updateTransactionSpy = jest.spyOn(service, 'update');
    const merchant_name = 'Whole Foods';
    const isFollowed = false;
    service.update({merchant_name, isFollowed});
    expect(updateTransactionSpy).toHaveBeenCalledWith({merchant_name, isFollowed});
  });
});
