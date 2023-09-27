import { EXCEPTION_CODE } from '@/core/shared/exception/exception-code.enum';
import { AbstractException } from '@/core/shared/exception/exception.abstract';
import { TExcecptionReason } from '@/core/shared/exception/exception.type';
import { ValidationError } from 'class-validator';

export class InvalidInputException extends AbstractException {
  readonly code = EXCEPTION_CODE.INVALID_INPUT;

  constructor(errors: ValidationError[]) {
    super(`Input have ${errors.length} invalid fiels`);
    this.setReason(InvalidInputException._parseErrors(errors, []));
  }

  private static _parseErrors(errors: ValidationError[], data: TExcecptionReason[], property?: string) {
    errors.forEach((error, index) => {
      if (error.children.length) return InvalidInputException._parseErrors(error.children, data, error.property);
      const resons = Object.values(error.constraints).map((message) => ({
        target: property ? `${property}.${error.property}` : error.property,
        message,
      }));
      data.push(...resons);
    });

    return data;
  }
}
