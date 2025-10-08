import { Module } from '@nestjs/common';
import { VerifyController } from './verify.controller';
import { VerifyService } from './verify.service';
import { KafkaModule } from 'src/kafka/kafka.module';
import { VerifyConsumer } from './verify.consumer';
@Module({
  controllers: [VerifyController],
  providers: [VerifyService, VerifyConsumer],
  imports: [KafkaModule],
})
export class VerifyModule {}
