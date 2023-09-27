import { IConnectorEngine } from '@/infra/shared/connector.contract';
import { OnModuleInit } from '@nestjs/common';
import { Client } from 'pg';

export class PgTypedConnectorEngine implements IConnectorEngine<Client>, OnModuleInit {
  private _client: Client;
  private readonly configuration: any = {};

  get engine() {
    return this._client;
  }

  async onModuleInit() {
    this._client = new Client({
      host: this.configuration.host,
      port: this.configuration.port,
      password: this.configuration.password,
      user: this.configuration.user,
      database: this.configuration.name,
    });

    await this._client.connect();
  }
}
