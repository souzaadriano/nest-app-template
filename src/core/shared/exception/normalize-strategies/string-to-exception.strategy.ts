import { EXCEPTION_CODE } from '../exception-code.enum';
import { AbstractException } from '../exception.abstract';
import { INormalizeExceptionStrategy } from './normalize-exception.strategy.contract';

export class StringToException extends AbstractException {
  readonly code = EXCEPTION_CODE.UNKNOWN;
}

export class StringExceptionNormalizer implements INormalizeExceptionStrategy<string> {
  shouldUse(error: unknown): boolean {
    return typeof error === 'string';
  }

  handle(error: string): AbstractException {
    return new StringToException(error);
  }
}
