import { BadRequestException, Injectable } from '@nestjs/common';
import { VerifyDTO } from './verify.dto';
import { db } from 'src/lib/db';
import { IssuanceKafkaPayload } from '@zupple_labs_assignment/types';
@Injectable()
export class VerifyService {
  async verify(data: VerifyDTO) {
   
    const { userId, credentialType } = data;
    const check = await db.issued.findFirst({
      where: {
        userId,
      },
    });
    if (!check || check.credentialType !== credentialType) {
      throw new BadRequestException({
        message: 'Invalid credentials',
      });
    }

    return {
      message: 'Valid credential',
      workerId: check.workerId,
      assignedAt: check.assignedAt,
    };
  }

  async create(data: IssuanceKafkaPayload) {
    const { userId, assignedAt, credentialType, workerId } = data;
    await db.issued.create({
      data: {
        userId,
        credentialType,
        assignedAt: new Date(assignedAt),
        workerId,
      },
    });
    console.info(
      `[VERIFICATION CONSUMER] User ${userId} credentials registered`,
    );
  }
}
