import { TGenericInterval } from '@/core/shared/types/generic-interval.type';
import { TJsonDocument } from '@/core/shared/types/json-document.type';
import { Injectable } from '@nestjs/common';
import { RedisKey } from '../class/key/redis-key.class';
import { RedisConnector } from './redis-connector.adapter';
import { IRedisEngine } from './redis-engine.contract';

@Injectable()
export class RedisEngine implements IRedisEngine {
  constructor(private readonly _engine: RedisConnector) {}

  async set(key: RedisKey, value: string): Promise<void> {
    key.ttl
      ? await this._engine.engine.set(key.value, value, 'PX', key.ttl.value)
      : await this._engine.engine.set(key.value, value);
  }

  async get(key: RedisKey): Promise<string> {
    return (await this._engine.engine.get(key.value)) ?? null;
  }

  async setList(key: RedisKey, mode: 'BEFORE' | 'AFTER', ...value: any[]): Promise<void> {
    mode === 'AFTER'
      ? await this._engine.engine.lpush(key.value, ...value)
      : await this._engine.engine.rpush(key.value, ...value);
  }

  async consumeList(key: RedisKey, mode: 'BEFORE' | 'AFTER', quantity: number) {
    new Array(quantity).fill(key.value).map(async (value: string) => {
      return mode === 'AFTER' ? await this._engine.engine.rpop(value) : await this._engine.engine.lpop(value);
    });
  }

  async getList(key: RedisKey, interval?: TGenericInterval<number>): Promise<string[]> {
    return await this._engine.engine.lrange(key.value, interval.begin ?? 0, interval.end ?? -1);
  }

  async setBuffer(key: RedisKey, value: Buffer): Promise<void> {
    key.ttl
      ? await this._engine.engine.set(key.value, value, 'PX', key.ttl.value)
      : await this._engine.engine.set(key.value, value);
  }

  async getBuffer(key: RedisKey): Promise<Buffer> {
    return (await this._engine.engine.getBuffer(key.value)) ?? null;
  }

  async setJson(key: RedisKey, value: TJsonDocument): Promise<void> {
    await this.set(key, JSON.stringify(value));
  }

  async getJson<T>(key: RedisKey): Promise<T> {
    const value = await this.get(key);
    if (!value) return null;
    return JSON.parse(value);
  }

  async delete(key: RedisKey): Promise<void> {
    await this._engine.engine.del(key.value);
  }

  async refresh(key: RedisKey, type: 'SUM' | 'SET' = 'SET'): Promise<void> {
    if (type === 'SET') {
      await this._engine.engine.pexpire(key.value, key.ttl.value ?? 0);
    } else {
      const currentTtl = await this._engine.engine.pttl(key.value);
      const expireInMs = currentTtl + key.ttl.value ?? 0;
      await this._engine.engine.pexpire(key.value, expireInMs);
    }
  }

  async has(key: RedisKey): Promise<boolean> {
    const result = await this._engine.engine.exists(key.value);
    return result > 0;
  }
}
