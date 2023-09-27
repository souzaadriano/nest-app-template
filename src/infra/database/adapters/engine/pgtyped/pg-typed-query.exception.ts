import { EXCEPTION_CODE } from '@/core/shared/exception/exception-code.enum';
import { AbstractException } from '@/core/shared/exception/exception.abstract';
import { DATABASE_OPERATION } from './database-operations.enum';

export class PGTypedQueryException extends AbstractException {
  readonly code = EXCEPTION_CODE.DATABASE;

  constructor(error: unknown, operation: DATABASE_OPERATION, statement: string) {
    super(error instanceof Error ? error.message : 'unknown database error');
    this.set('statement', statement);
    this.set('operation', operation);
  }
}
