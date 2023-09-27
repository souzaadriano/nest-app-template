import { TGenericInterval } from '@/core/shared/types/generic-interval.type';
import { TJsonDocument } from '@/core/shared/types/json-document.type';
import { RedisKey } from '../class/key/redis-key.class';

export interface IRedisEngine {
  set(key: RedisKey, value: string): Promise<void>;
  get(key: RedisKey): Promise<string | null>;
  setBuffer(key: RedisKey, value: Buffer): Promise<void>;
  getBuffer(key: RedisKey): Promise<Buffer | null>;
  setJson(key: RedisKey, value: TJsonDocument): Promise<void>;
  getJson<T>(key: RedisKey): Promise<T | null>;
  refresh(key: RedisKey): Promise<void>;
  has(key: RedisKey): Promise<boolean>;
  delete(key: RedisKey): Promise<void>;
  getList(key: RedisKey, interval?: TGenericInterval<number>): Promise<string[]>;
  consumeList(key: RedisKey, mode: 'BEFORE' | 'AFTER', quantity: number);
  setList(key: RedisKey, mode: 'BEFORE' | 'AFTER', ...value: any[]): Promise<void>;
}
