import { IGenerateStrategy, TGenerateStrategyOutput } from '../generate-strategy.contract';
import { PgTypedConfigInput } from './pg-typed-config.input';
import { pgTypedConfigTemplate } from './pg-typed-config.template';

export class PgTypedConfigGenerateStrategy implements IGenerateStrategy<void> {
  readonly name = 'pg-typed-config';

  async generate(input: void): Promise<TGenerateStrategyOutput> {
    const templateParams = new PgTypedConfigInput();
    const file = pgTypedConfigTemplate(templateParams);
    const path = `${process.cwd()}/pg-typed.config.json`;

    return { file, path };
  }
}
