import { DateTime } from '../class/date-time/date-time.class';
import { TJsonValue } from '../types/json-document.type';
import { EXCEPTION_CODE } from './exception-code.enum';

export abstract class AbstractException extends Error {
  private readonly _forbbidenProperties = new Set(['_issuedAt', '_message', '_name', '_trace', '_code']);
  private readonly _details = new Map<string, TJsonValue>();
  abstract readonly code: EXCEPTION_CODE;
  readonly issuedAt = DateTime.now();

  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }

  set(key: string, value: TJsonValue) {
    if (this._forbbidenProperties.has(key)) throw new Error(`Invalid exception detail key ${key}`);
    this._details.set(key, value);
  }

  get<T extends TJsonValue = TJsonValue>(key: string): T | undefined {
    return this._details.get(key) as T | undefined;
  }

  details() {
    const details = Object.fromEntries(this._details.entries());
    details['_issuedAt'] = this.issuedAt.format();
    details['_message'] = this.message;
    details['_name'] = this.name;
    details['_trace'] = this.stack;
    details['_cause'] = (this.cause as TJsonValue) ?? 'empty';
    details['_code'] = this.code;

    return details;
  }
}
