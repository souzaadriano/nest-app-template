import { Log } from '@/core/shared/class/log/log.class';
import { IUseCase, TStandardInput } from '@/core/shared/contracts/use-case.contract';
import { NormalizeException } from '@/core/shared/exception/exception.normalize';
import { LoggerService } from '@/infra/logger/services/logger-service.adapter';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ClassConstructor } from 'environment-variables-decorator/dist/helpers/class-constructor.type';
import { Request, Response } from 'express';
import { InvalidInputException } from '../exceptions/invalid-input.exception';
import { HttpStatusMapper } from '../mappers/http-status-mapper';
import { RestHandlerInstrumentation } from './rest-handler.instrumentation';

export class RestHandler {
  private readonly _request: Request;
  private readonly _response: Response;
  private readonly _Schema?: ClassConstructor<any>;

  constructor(input: TRestHandlerConstructor) {
    this._request = input.request;
    this._response = input.response;
    this._Schema = input.Schema;
  }

  async handle<INPUT, OUTPUT>(useCase: IUseCase<INPUT, OUTPUT>, logger: LoggerService) {
    const instrumentation = new RestHandlerInstrumentation(Log.create(useCase.context), logger);
    try {
      instrumentation.setRequest(this._request);
      const input = await this._getInput<INPUT>(instrumentation.getLog());
      const output = await useCase.execute(input);
      instrumentation.setStatus(200);
      instrumentation.emit();
      return this._response.status(200).json(output);
    } catch (error) {
      const exception = this._handleError(error, instrumentation);
      return this._response.status(exception.status).json(exception.output);
    }
  }

  private _buildInput(): TStandardInput<any> {
    const result: TStandardInput<any> = {};

    const body = Object.entries(this._request.body);
    const params = Object.entries(this._request.params);
    const query = Object.entries(this._request.query);

    body.reduce((result, data) => this._setProp(result, data), result);
    params.reduce((result, data) => this._setProp(result, data), result);
    query.reduce((result, data) => this._setProp(result, data), result);
    return result;
  }

  private _setProp(obj: any, [key, value]: [string, any]) {
    obj[key] = value;
    return obj;
  }

  private async _getInput<INPUT>(log: Log): Promise<TStandardInput<INPUT>> {
    const input: TStandardInput<INPUT> = this._Schema ? plainToInstance(this._Schema, this._buildInput()) : {};
    const invalidInputs = this._Schema ? await validate(input) : [];
    input.log = log;
    input.session = this._request['session'] ?? null;
    if (invalidInputs.length) throw new InvalidInputException(invalidInputs);
    return input;
  }

  private _handleError(error: unknown, instrumentation: RestHandlerInstrumentation) {
    const exception = NormalizeException.normalize(error);
    instrumentation.setException(exception);
    const reasons = exception.getReason();
    const output = { message: exception.message, code: exception.code, reasons };
    const status = HttpStatusMapper.byException(exception);
    instrumentation.setStatus(status);
    instrumentation.emit();
    return { status, output };
  }
}

export type TRestHandlerConstructor = {
  request: Request;
  response: Response;
  Schema?: ClassConstructor<any>;
};
