import { Module } from '@nestjs/common';
import { LoggerService } from './services/logger-service.adapter';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
