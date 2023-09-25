import { ErrorExceptionNormalizer } from './error-to-exception.strategy';
import { INormalizeExceptionStrategy } from './normalize-exception.strategy.contract';
import { NumberExceptionNormalizer } from './number-to-exception.strategy';
import { StringExceptionNormalizer } from './string-to-exception.strategy';

export const normalizeExceptionStrategies: INormalizeExceptionStrategy<any>[] = [
  new ErrorExceptionNormalizer(),
  new StringExceptionNormalizer(),
  new NumberExceptionNormalizer(),
];
