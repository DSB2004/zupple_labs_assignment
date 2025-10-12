import { Module } from '@nestjs/common';
import { VerifyController } from './verify.controller';
import { VerifyService } from './verify.service';
import { KafkaModule } from 'src/kafka/kafka.module';
import { VerifyConsumer } from './verify.consumer';
import { Hash } from '@zupple_labs_assignment/hash';
@Module({
  controllers: [VerifyController],
  providers: [VerifyService, VerifyConsumer, Hash],
  imports: [KafkaModule],
})
export class VerifyModule {}
