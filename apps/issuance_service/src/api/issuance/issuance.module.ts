import { Module } from '@nestjs/common';
import { IssuanceController } from './issuance.controller';
import { IssuanceService } from './issuance.service';
import { KafkaModule } from 'src/kafka/kafka.module';
@Module({
  controllers: [IssuanceController],
  providers: [IssuanceService],
  imports: [KafkaModule],
})
export class IssuanceModule {}
