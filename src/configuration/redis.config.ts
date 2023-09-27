import { Environment } from 'environment-variables-decorator';

export class RedisConfig {
  @Environment('REDIS_HOST')
  host: string;

  @Environment('REDIS_PORT')
  port: number;

  @Environment('REDIS_PASSWORD')
  password: string;

  @Environment('REDIS_DATABASE', 0)
  db: number;
}
