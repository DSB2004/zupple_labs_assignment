import { Test, TestingModule } from '@nestjs/testing';
import { VerifyController } from './verify.controller';
import { VerifyService } from './verify.service';
import { KafkaProducer } from 'src/kafka/kafka.producer';
import { BadRequestException } from '@nestjs/common';

jest.mock('src/lib/db', () => ({
  db: {
    issued: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

import { db } from 'src/lib/db';

describe('VerificationController', () => {
  let appController: VerifyController;
  let kafkaProducer: KafkaProducer;
  let appService: VerifyService;

  const workerId = '4620ab70-e48d-487d-891e-a168e6a24da6';
  const userId = '3f5e8a9b-6c12-4d3f-8f2b-7a9e1d5c4b2f';
  const correctCred = '12345678';
  const wrongCred = '123456';
  const mockProducer = { produce: jest.fn().mockResolvedValue(true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerifyController],
      providers: [
        VerifyService,
        { provide: KafkaProducer, useValue: mockProducer },
      ],
    }).compile();

    appController = module.get<VerifyController>(VerifyController);

    appService = module.get<VerifyService>(VerifyService);
    kafkaProducer = module.get<KafkaProducer>(KafkaProducer);
  });

  it('should sync credentails as received by kafka event', async () => {
    const credentialSecret = 'Sample@1234';

    (db.issued.findUnique as jest.Mock).mockResolvedValueOnce(null);
    (db.$transaction as jest.Mock).mockImplementationOnce(async (fn) => {
      return fn({
        worker: {
          create: jest
            .fn()
            .mockResolvedValue({ id: 'worker123', createdAt: new Date() }),
        },
      });
    });

    const result = await appService.create({
      userId,
      credentialSecret: correctCred,
      workerId,
      assignedAt: Date.now().toString(),
    });
    expect(result).toBe(true);
  });

  it('should not throw error, correct credential entered', async () => {
    (db.issued.findFirst as jest.Mock).mockResolvedValue({ userId });

    await expect(
      appController.handleVerify({
        userId,
        credentialSecret: correctCred,
      }),
    ).rejects.toThrow(BadRequestException);
  });
  it('should throw error, wrong credential entered', async () => {
    (db.issued.findFirst as jest.Mock).mockResolvedValue({ userId });

    await expect(
      appController.handleVerify({
        userId,
        credentialSecret: wrongCred,
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
