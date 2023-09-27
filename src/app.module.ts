import { Module } from '@nestjs/common';
import { CommandProviders } from './commands';
import { ExampleModule } from './core/example/example.module';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [LoggerModule, ExampleModule],
  providers: [...CommandProviders],
})
export class AppModule {}
