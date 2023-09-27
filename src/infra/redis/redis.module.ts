import { Module } from '@nestjs/common';
import { RedisConnector } from './adapters/redis-connector.adapter';
import { RedisEngine } from './adapters/redis-engine.adapter';

@Module({
  providers: [RedisConnector, RedisEngine],
  exports: [RedisEngine],
})
export class RedisModule {}
