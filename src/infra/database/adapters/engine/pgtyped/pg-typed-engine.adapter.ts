import { LoggerService } from '@/infra/logger/services/logger-service.adapter';
import { Injectable } from '@nestjs/common';
import { PreparedQuery } from '@pgtyped/runtime';
import { PgTypedConnectorEngine } from '../../connector/pg-typed-connector.adapter';
import { DatabaseEngineInstrumentation } from '../database-engine.instrumentation';
import { DATABASE_OPERATION } from './database-operations.enum';
import { PGTypedQueryException } from './pg-typed-query.exception';

export type TExecuteCommand<INPUT> = (params: INPUT) => Promise<void>;
export type TQueryCommand<INPUT, OUTPUT> = (params: INPUT) => Promise<OUTPUT>;

@Injectable()
export class PgTypedEngine {
  constructor(private readonly _connector: PgTypedConnectorEngine, private readonly _logger: LoggerService) {}

  insert<INPUT, OUTPUT>(statement: string, fn: PreparedQuery<INPUT, OUTPUT>): TExecuteCommand<INPUT> {
    return this._execute(statement, DATABASE_OPERATION.INSERT, fn);
  }

  delete<INPUT, OUTPUT>(statement: string, fn: PreparedQuery<INPUT, OUTPUT>): TExecuteCommand<INPUT> {
    return this._execute(statement, DATABASE_OPERATION.DELETE, fn);
  }

  update<INPUT, OUTPUT>(statement: string, fn: PreparedQuery<INPUT, OUTPUT>): TExecuteCommand<INPUT> {
    return this._execute(statement, DATABASE_OPERATION.UPDATE, fn);
  }

  select<INPUT, OUTPUT>(statement: string, fn: PreparedQuery<INPUT, OUTPUT>): TQueryCommand<INPUT, OUTPUT[]> {
    return this._query(statement, DATABASE_OPERATION.SELECT, fn);
  }

  first<INPUT, OUTPUT>(statement: string, fn: PreparedQuery<INPUT, OUTPUT>): TQueryCommand<INPUT, OUTPUT> {
    return this._queryOne(statement, DATABASE_OPERATION.SELECT, fn);
  }

  upsert<INPUT, OUTPUT>(statement: string, fn: PreparedQuery<INPUT, OUTPUT>): TExecuteCommand<INPUT> {
    return this._execute(statement, DATABASE_OPERATION.UPSERT, fn);
  }

  private _query<INPUT, OUTPUT>(statement: string, operation: DATABASE_OPERATION, fn: PreparedQuery<INPUT, OUTPUT>) {
    return async (params: INPUT): Promise<OUTPUT[]> => {
      const instrumentation = new DatabaseEngineInstrumentation(this._logger);
      try {
        instrumentation.setEngine('pg-typed');
        instrumentation.setStatement(statement);
        instrumentation.setEngineDetails('operation', operation);
        const data = fn.run(params, this._connector.engine);
        instrumentation.emit();
        return data;
      } catch (error) {
        const exception = new PGTypedQueryException(error, operation, statement);
        instrumentation.exception(exception);
        instrumentation.emit();
        throw exception;
      }
    };
  }

  private _queryOne<INPUT, OUTPUT>(statement: string, operation: DATABASE_OPERATION, fn: PreparedQuery<INPUT, OUTPUT>) {
    const executor = this._query(statement, operation, fn);
    return async (params: INPUT): Promise<OUTPUT | undefined> => {
      const [output] = await executor(params);
      return output;
    };
  }

  private _execute<INPUT, OUTPUT>(statement: string, operation: DATABASE_OPERATION, fn: PreparedQuery<INPUT, OUTPUT>) {
    const executor = this._query(statement, operation, fn);
    return async (params: INPUT): Promise<void> => {
      await executor(params);
    };
  }
}
