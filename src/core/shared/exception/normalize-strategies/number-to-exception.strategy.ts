import { EXCEPTION_CODE } from '../exception-code.enum';
import { AbstractException } from '../exception.abstract';
import { INormalizeExceptionStrategy } from './normalize-exception.strategy.contract';

export class NumberToException extends AbstractException {
  readonly code = EXCEPTION_CODE.UNKNOWN;
  constructor(message: number) {
    super(`error returned a number ${message}`);
  }
}

export class NumberExceptionNormalizer implements INormalizeExceptionStrategy<number> {
  shouldUse(error: unknown): boolean {
    return typeof error === 'number';
  }

  handle(error: number): AbstractException {
    return new NumberToException(error);
  }
}
