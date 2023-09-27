import { Module } from '@nestjs/common';
import { RedisConnector } from './adapters/redis-connector.adapter';

@Module({
  providers: [RedisConnector],
})
export class RedisModule {}
