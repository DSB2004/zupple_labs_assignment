import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';
import { KafkaModule } from './kafka/kafka.module';
@Module({
  imports: [ApiModule, KafkaModule],
  controllers: [AppController],
})
export class AppModule {}
