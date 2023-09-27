import { LoggerModule } from '@/modules/logger/logger.module';
import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { CheckParamsUseCase } from './use-cases/check-params.use-case';

@Module({
  imports: [LoggerModule],
  controllers: [ExampleController],
  providers: [CheckParamsUseCase],
})
export class ExampleModule {}
