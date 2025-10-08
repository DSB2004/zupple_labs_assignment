import { Module } from '@nestjs/common';
import { IssuanceModule } from './issuance/issuance.module';

@Module({
  imports: [IssuanceModule]
})
export class ApiModule {}
