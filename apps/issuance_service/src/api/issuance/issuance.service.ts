import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IssueCredentialDTO } from './issuance.dto';
import { db } from 'src/lib/db';
import { KafkaProducer } from 'src/kafka/kafka.producer';
import {
  IssuanceKafkaPayload,
  IssuanceKafkaEvent,
} from '@zupple_labs_assignment/types';
import { Hash } from '@zupple_labs_assignment/hash';
@Injectable()
export class IssuanceService {
  constructor(
    private readonly producer: KafkaProducer,
    private readonly hash: Hash,
  ) {}

  async issueCred(data: IssueCredentialDTO) {
    const { userId } = data;
    const check = await db.worker.findUnique({
      where: {
        userId,
      },
    });
    if (check) {
      throw new BadRequestException({
        message: 'Credential have been already issued for this userId',
      });
    }

    try {
      const hashSecret = await this.hash.HashPassword(data.credentialSecret);
      await db.$transaction(async (instance) => {
        const worker = await instance.worker.create({
          data: {
            ...data,
            credentialSecret: hashSecret,
          },
        });
        const payload: IssuanceKafkaPayload = {
          ...data,
          credentialSecret: hashSecret,
          workerId: worker.id,
          assignedAt: worker.createdAt.toUTCString(),
        };
        await this.producer.produce(IssuanceKafkaEvent, [payload]);
        return worker;
      });

      return { message: `Issued by user ${userId}`, status: 201 };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException({
        message: 'Internal server error',
      });
    }
  }
}
