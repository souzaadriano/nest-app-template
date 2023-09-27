import { TTL } from '../ttl/ttl.class';
import { RedisKey } from './redis-key.class';
import { REDIS_KEY } from './redis-key.enum';

export abstract class RedisKeyBuilder {
  static factory<T>(path: REDIS_KEY, ttl?: TTL) {
    return (input: T) => new RedisKey(path, input as any, ttl);
  }
}
