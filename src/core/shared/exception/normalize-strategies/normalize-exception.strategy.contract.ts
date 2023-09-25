import { AbstractException } from '../exception.abstract';

export interface INormalizeExceptionStrategy<T> {
  shouldUse(error: unknown): boolean;
  handle(error: T): AbstractException;
}
