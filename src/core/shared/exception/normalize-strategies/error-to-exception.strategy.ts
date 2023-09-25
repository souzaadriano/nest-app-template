import { EXCEPTION_CODE } from '../exception-code.enum';
import { AbstractException } from '../exception.abstract';
import { INormalizeExceptionStrategy } from './normalize-exception.strategy.contract';

export class ErrorToException extends AbstractException {
  readonly code = EXCEPTION_CODE.UNKNOWN;

  constructor(error: Error) {
    super(error.message);
    this.cause = error.cause;
    this.stack = error.stack;
    this.name = error.name;
  }
}

export class ErrorExceptionNormalizer implements INormalizeExceptionStrategy<Error> {
  shouldUse(error: unknown): boolean {
    return error instanceof Error;
  }

  handle(error: Error): AbstractException {
    return new ErrorToException(error);
  }
}
