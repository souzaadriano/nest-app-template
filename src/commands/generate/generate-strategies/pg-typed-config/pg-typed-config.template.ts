import { TemaplteFn } from '../template-fn.contract';
import { PgTypedConfigInput } from './pg-typed-config.input';

export const pgTypedConfigTemplate: TemaplteFn<PgTypedConfigInput> = (input: PgTypedConfigInput) => `
{
    "transforms": [
      {
        "mode": "sql",
        "include": "**/*.sql",
        "emitTemplate": "{{dir}}/../../src/infra/database/queries/{{name}}.queries.ts"
      }
    ],
    "srcDir": "./database/sql/",
    "dbUrl": "${input.dbUrl}"
}
`;
