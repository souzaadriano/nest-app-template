import { Module } from '@nestjs/common';
import { LoggerService } from './services/logger-service.adapter';

@Module({
  providers: [LoggerService],
})
export class LoggerModule {}
