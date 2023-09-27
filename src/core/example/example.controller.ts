import { LoggerService } from '@/modules/logger/services/logger-service.adapter';
import { RequestHandler } from '@/modules/rest/decorators/request-handler.decorator';
import { RestHandler } from '@/modules/rest/handlers/rest.handler';
import { Controller, Post } from '@nestjs/common';
import { ExampleSchema } from './schemas/example.schema';
import { CheckParamsUseCase } from './use-cases/check-params.use-case';

@Controller('example')
export class ExampleController {
  constructor(private readonly _logger: LoggerService, private readonly _useCase: CheckParamsUseCase) {}

  @Post()
  async checkParams(@RequestHandler() request: RestHandler) {
    await request.handle(this._useCase, this._logger);
  }

  @Post('/:id')
  async checkParamstwo(@RequestHandler(ExampleSchema) request: RestHandler) {
    await request.handle(this._useCase, this._logger);
  }
}
