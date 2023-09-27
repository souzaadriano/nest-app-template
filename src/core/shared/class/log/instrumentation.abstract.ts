import { Log } from '@/core/shared/class/log/log.class';
import { ILoggerService } from '@/modules/logger/services/logger-service.contract';

export abstract class AbstractInstrumentation {
  constructor(protected readonly _log: Log, private readonly _logger: ILoggerService) {}

  emit(): void {
    this._logger.log(this._log);
  }
}
