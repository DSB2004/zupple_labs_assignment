import { Injectable } from '@nestjs/common';

import { KafkaConsumer } from 'src/kafka/kafka.consumer';
import {
  IssuanceKafkaPayload,
  IssuanceKafkaEvent,
} from '@zupple_labs_assignment/types';
import { VerifyService } from './verify.service';

@Injectable()
export class VerifyConsumer {
  constructor(
    private readonly consumer: KafkaConsumer,
    private readonly service: VerifyService,
  ) {}

  async onModuleInit() {
    await this.consumer.consume(
      'verification',
      {
        topics: [IssuanceKafkaEvent],
      },
      {
        eachMessage: async ({ topic, partition, message }) => {
          const payload = JSON.parse(message?.value?.toString() || '{}');
          console.log('here');
          switch (topic) {
            case IssuanceKafkaEvent: {
              const cred: IssuanceKafkaPayload = { ...payload };
              await this.service.create(cred);
            }
          }
        },
      },
    );
  }
}
