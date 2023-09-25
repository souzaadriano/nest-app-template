import { AbstractException } from './exception.abstract';
import { normalizeExceptionStrategies } from './normalize-strategies';
import { UnknownException } from './unknow-error.exception';

export abstract class NormalizeException {
  private static _strategies = normalizeExceptionStrategies;
  static normalize(error: unknown): AbstractException {
    if (error instanceof AbstractException) return error;
    const strategy = NormalizeException._strategies.find((strategy) => strategy.shouldUse(error));
    return strategy ? strategy.handle(error) : new UnknownException(error);
  }
}
