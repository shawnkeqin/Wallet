import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { HttpService } from '@nestjs/axios';
import { PubSub } from 'graphql-subscriptions';
import { HttpModule } from '@nestjs/axios';

const mockTransactionsRepository = {};

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [TransactionsService,{
        provide: 'PUB_SUB',
        useValue: new PubSub(),
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
});
