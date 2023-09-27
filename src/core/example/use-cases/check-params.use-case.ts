import { IUseCase, TStandardInput } from '@/core/shared/contracts/use-case.contract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckParamsUseCase implements IUseCase<any, any> {
  readonly context = 'CheckParamsUseCase';
  async execute(input: TStandardInput<{}>): Promise<any> {
    const { log, ...params } = input;
    log.set('paramQuantity', Object.values(params).length);
    return params;
  }
}
