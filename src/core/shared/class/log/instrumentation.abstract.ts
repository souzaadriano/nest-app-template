import { Log } from '@/core/shared/class/log/log.class';
import { NormalizeException } from '@/core/shared/exception/exception.normalize';
import { ILoggerService } from '@/modules/logger/services/logger-service.contract';

export abstract class AbstractInstrumentation {
  constructor(private readonly _log: Log, private readonly _logger: ILoggerService) {}

  success(): void {
    this._logger.log(this._log);
  }

  fail(error: unknown): void {
    const exception = NormalizeException.normalize(error);
    this._log.exception(exception);
    this._logger.log(this._log);
  }
}
