import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { VerifyDTO } from './verify.dto';
import { Hash } from '@zupple_labs_assignment/hash';
import { db } from 'src/lib/db';
import { IssuanceKafkaPayload } from '@zupple_labs_assignment/types';
@Injectable()
export class VerifyService {
  constructor(private readonly hash: Hash) {}
  async verify(data: VerifyDTO) {
    const { userId, credentialSecret } = data;
    const check = await db.issued.findFirst({
      where: {
        userId,
      },
    });
    if (!check) {
      throw new NotFoundException({
        message: 'Credentials not assigned yet',
      });
    }
    const valid = await this.hash.ComparePassword(
      credentialSecret,
      check?.credentialSecret,
    );
    if (!valid) {
      throw new BadRequestException({
        message: 'Invalid Credentials',
      });
    }
    return {
      message: 'Valid credential',
      workerId: check.workerId,
      assignedAt: check.assignedAt,
    };
  }

  async create(data: IssuanceKafkaPayload) {
    const { userId, assignedAt, credentialSecret, workerId } = data;
    await db.issued.create({
      data: {
        userId,
        credentialSecret,
        assignedAt: new Date(assignedAt),
        workerId,
      },
    });
    console.info(
      `[VERIFICATION CONSUMER] User ${userId} credentials registered`,
    );
    return true;
  }
}
