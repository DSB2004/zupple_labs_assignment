
import { Test, TestingModule } from '@nestjs/testing';
import { IssuanceController } from './issuance.controller';
import { IssuanceService } from './issuance.service';
import { KafkaProducer } from 'src/kafka/kafka.producer';
import { BadRequestException } from '@nestjs/common';


jest.mock('src/lib/db', () => ({
  db: {
    worker: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

import { db } from 'src/lib/db';

describe('IssuanceController', () => {
  let appController: IssuanceController;
  let kafkaProducer: KafkaProducer;
const userId="3f5e8a9b-6c12-4d3f-8f2b-7a9e1d5c4b2f"
  const mockProducer = { produce: jest.fn().mockResolvedValue(true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IssuanceController],
      providers: [
        IssuanceService,
        { provide: KafkaProducer, useValue: mockProducer },
      ],
    }).compile();

    appController = module.get<IssuanceController>(IssuanceController);
    kafkaProducer = module.get<KafkaProducer>(KafkaProducer);
  });

  it('should assign new credentials', async () => {

    const credentialSecret = 'Sample@1234';

    (db.worker.findUnique as jest.Mock).mockResolvedValueOnce(null);
    (db.$transaction as jest.Mock).mockImplementationOnce(async (fn) => {
      return fn({
        worker: {
          create: jest.fn().mockResolvedValue({ id: 'worker123', createdAt: new Date() }),
        },
      });
    });

    const result = await appController.handleCredIssuance({ userId, credentialSecret });
    expect(result).toMatchObject({ status: 201 });
    expect(mockProducer.produce).toHaveBeenCalled();
  });

  it('should throw error if credential already exists', async () => {
    (db.worker.findUnique as jest.Mock).mockResolvedValueOnce({ userId });

    await expect(
      appController.handleCredIssuance({ userId, credentialSecret: 'Sample@1234' }),
    ).rejects.toThrow(BadRequestException);
  });
});
