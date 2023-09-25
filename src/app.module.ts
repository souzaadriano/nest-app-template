import { Module } from '@nestjs/common';
import { CommandProviders } from './commands';

@Module({
  providers: [...CommandProviders],
})
export class AppModule {}
