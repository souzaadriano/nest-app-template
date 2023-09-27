import { AbstractInstrumentation } from '@/core/shared/class/log/instrumentation.abstract';
import { Log } from '@/core/shared/class/log/log.class';
import { AbstractException } from '@/core/shared/exception/exception.abstract';
import { TJsonValue } from '@/core/shared/types/json-document.type';
import { LoggerService } from '@/infra/logger/services/logger-service.adapter';

export class DatabaseEngineInstrumentation extends AbstractInstrumentation {
  constructor(logger: LoggerService) {
    super(Log.create('DATABASE_ENGINE'), logger);
  }

  setEngine(engine: string) {
    this._log.set('engine', engine);
  }

  setStatement(statement: string) {
    this._log.set('statement', statement);
  }

  setEngineDetails(key: string, value: TJsonValue) {
    const subContext = this._log.getSubContext('engineDetails');
    subContext.set(key, value);
  }

  exception(exception: AbstractException) {
    this._log.exception(exception);
  }
}
