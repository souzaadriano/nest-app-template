import { EXCEPTION_CODE } from './exception-code.enum';
import { AbstractException } from './exception.abstract';

// Classe fictícia para teste que herda de AbstractException
export class TestException extends AbstractException {
  readonly code: EXCEPTION_CODE = EXCEPTION_CODE.UNKNOWN;
}
