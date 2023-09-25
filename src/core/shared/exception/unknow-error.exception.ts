import { EXCEPTION_CODE } from './exception-code.enum';
import { AbstractException } from './exception.abstract';

export class UnknownException extends AbstractException {
  readonly code = EXCEPTION_CODE.UNKNOWN;

  constructor(error: unknown) {
    super(String(error));
  }
}
