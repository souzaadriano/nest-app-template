import { redisConfig } from '@/configuration';
import { OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { IConnectorEngine } from '../../shared/connector.contract';

export class RedisConnector implements OnModuleInit, IConnectorEngine<Redis> {
  private readonly _configuration = redisConfig;
  private _client: Redis;

  get engine(): Redis {
    return this._client;
  }

  async onModuleInit() {
    this._client = new Redis({
      host: this._configuration.host,
      db: this._configuration.db,
      port: this._configuration.port,
      password: this._configuration.password,
      lazyConnect: true,
    });

    await this._client.connect();
  }
}
