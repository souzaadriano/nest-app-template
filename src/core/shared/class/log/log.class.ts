import { AbstractException } from '../../exception/exception.abstract';
import { TJsonDocument, TJsonValue } from '../../types/json-document.type';
import { DateTime } from '../date-time/date-time.class';
import { ProcessId } from '../process-id/process-id.class';
import { Stopwatch } from '../stopwatch/stopwatch.class';
import { LOG_TRIGGER } from './log-trigger.enum';
import { FORBBIDEN_LOG_KEYS } from './log.constant';

export class Log {
  private readonly _data: Map<string, TJsonValue> = new Map();
  private readonly _subContexts: Map<string, Log> = new Map();
  private readonly _forbbidenProperties = new Set(FORBBIDEN_LOG_KEYS);
  private readonly _stopwatch = new Stopwatch();
  readonly pid: ProcessId;
  readonly createdAt: DateTime;
  readonly context: string;
  readonly trigger: LOG_TRIGGER;

  constructor(context: string, trigger: LOG_TRIGGER, pid: ProcessId) {
    this.createdAt = DateTime.now();
    this._stopwatch.start(this.createdAt);
    this.pid = pid;
    this.context = context;
    this.trigger = trigger;
  }

  static create(context: string, trigger?: LOG_TRIGGER) {
    return new Log(context, trigger ?? LOG_TRIGGER.REQUEST_USER, ProcessId.create(context));
  }

  set(key: string, value: TJsonValue) {
    if (this._forbbidenProperties.has(key)) throw new Error();
    this._data.set(key, value);
  }

  subContext(context: string, key: string, value: TJsonValue): void {
    const subContext = this._subContexts.get(context);
    if (!subContext) return this._setNewSubContext(context, key, value);
    subContext.set(key, value);
  }

  get<T extends TJsonValue>(key: string): undefined | T {
    return this._data.get(key) as T;
  }

  has(key: string): boolean {
    return this._data.has(key);
  }

  getSubContext(context: string): Log {
    let subContext = this._subContexts.get(context);
    if (!subContext) {
      subContext = new Log(context, this.trigger, this.pid);
      this._subContexts.set(context, subContext);
    }

    return subContext;
  }

  exception(exception: AbstractException) {
    this._data.set('exception', exception.details());
  }

  data(): TJsonDocument {
    const entries = Array.from(this._data.entries());
    const data = Object.fromEntries(entries);
    Array.from(this._subContexts.values()).forEach((subContext) => {
      data[subContext.context] = subContext.data();
    });

    data['elapsedTime'] = this._stopwatch.end();
    data['createdAt'] = this.createdAt.format();
    data['pid'] = this.pid.value;

    return data;
  }

  private _setNewSubContext(context: string, key: string, value: TJsonValue) {
    const log = new Log(context, this.trigger, this.pid);
    log.set(key, value);
    this._subContexts.set(context, log);
  }
}
