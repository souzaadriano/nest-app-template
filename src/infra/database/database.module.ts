import { Module } from '@nestjs/common';
import { PgTypedConnectorEngine } from './adapters/connector/pg-typed-connector.adapter';
import { PgTypedEngine } from './adapters/engine/pgtyped/pg-typed-engine.adapter';

@Module({
  providers: [PgTypedConnectorEngine, PgTypedEngine],
  exports: [PgTypedEngine],
})
export class DatabaseModule {}
