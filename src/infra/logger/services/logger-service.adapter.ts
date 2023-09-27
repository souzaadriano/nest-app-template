import { Log } from '@/core/shared/class/log/log.class';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Logger } from 'pino';
import { ILoggerService } from './logger-service.contract';
import { PinoFactory } from './pino.factory';

@Injectable()
export class LoggerService implements OnModuleInit, ILoggerService {
  private _pino: Logger;

  onModuleInit() {
    this._pino = PinoFactory.factory();
  }

  text(context: string, message: string) {
    this._pino.info(`[${context}] ${message}`);
  }

  log(log: Log) {
    this._pino.info(log.data());
  }
}
