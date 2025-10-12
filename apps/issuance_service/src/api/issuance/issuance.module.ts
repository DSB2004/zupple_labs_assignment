import { Module } from '@nestjs/common';
import { IssuanceController } from './issuance.controller';
import { IssuanceService } from './issuance.service';
import { KafkaModule } from 'src/kafka/kafka.module';
import { Hash } from '@zupple_labs_assignment/hash';
@Module({
  controllers: [IssuanceController],
  providers: [IssuanceService, Hash],
  imports: [KafkaModule],
})
export class IssuanceModule {}
