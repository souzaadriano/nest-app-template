import { TJsonValue } from '@/core/shared/types/json-document.type';
import { TTL } from '../ttl/ttl.class';

export class RedisKey {
  private readonly _path: string;
  private readonly _params: Map<string, TJsonValue>;
  private readonly _value: string;
  readonly ttl?: TTL;

  constructor(path: string, params: Record<string, TJsonValue>, ttl?: TTL) {
    this._path = path;
    const mapeedParams = new Map<string, TJsonValue>(Object.entries(params));
    this._params = mapeedParams;
    this._value = this._parse(path, mapeedParams);
    this.ttl = ttl;
  }

  private _parse(path: string, params: Map<string, TJsonValue>) {
    return path
      .split('/')
      .map((path) => {
        return path.startsWith(':', 0) ? this._getValue(path, params) : path;
      })
      .join('/');
  }

  private _getValue(input: string, params: Map<string, TJsonValue>) {
    const key = input.substring(1);
    const value = params.get(key);
    return value;
  }

  get value(): string {
    return this._value;
  }
}
