import { Kafka } from 'kafkajs';

import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

const kafka = new Kafka({
  brokers: [configService.get<string>('KAFKA_BROKER') as string],
});

export { kafka };
