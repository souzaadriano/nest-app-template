import { IGenerateStrategy } from './generate-strategy.contract';
import { PgTypedConfigGenerateStrategy } from './pg-typed-config/pg-typed-config.strategy';

export const generateCommandStrategies: IGenerateStrategy<any>[] = [new PgTypedConfigGenerateStrategy()];
