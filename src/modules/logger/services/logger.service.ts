import { Log } from '@/core/shared/class/log/log.class';
import { AbstractException } from '@/core/shared/exception/exception.abstract';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Logger } from 'pino';
import { PinoFactory } from './pino.factory';

@Injectable()
export class LoggerService implements OnModuleInit {
  private _pino: Logger;

  onModuleInit() {
    this._pino = PinoFactory.factory();
  }

  emit(context: string, message: string) {
    this._pino.info(`[${context}] ${message}`);
  }

  log(log: Log) {
    this._pino.info(`[${log.context}]`, log.data());
  }

  exception(log: Log, exception: AbstractException) {
    log.exception(exception);
    this.log(log);
  }
}
