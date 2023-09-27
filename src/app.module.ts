import { Module } from '@nestjs/common';
import { CommandProviders } from './commands';
import { CoreModule } from './core/core.module';
import { LoggerModule } from './infra/logger/logger.module';
import { RedisModule } from './infra/redis/redis.module';

@Module({
  imports: [LoggerModule, RedisModule, CoreModule],
  providers: [...CommandProviders],
})
export class AppModule {}
