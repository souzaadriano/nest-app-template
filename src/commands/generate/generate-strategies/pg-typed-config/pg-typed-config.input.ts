import { databaseConfig } from '@/configuration';

export class PgTypedConfigInput {
  private _sqlDirectory?: string;
  private _queriesDirectory?: string;

  get dbUrl() {
    return databaseConfig.url;
  }

  get sqlDirectory() {
    return this._sqlDirectory ?? './database/sql/';
  }

  get queriesDirectory() {
    return this._queriesDirectory ?? '{{dir}}/../../src/infra/database/queries/{{name}}.queries.ts';
  }
}
