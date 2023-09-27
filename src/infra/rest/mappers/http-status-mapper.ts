import { EXCEPTION_CODE } from '@/core/shared/exception/exception-code.enum';
import { AbstractException } from '@/core/shared/exception/exception.abstract';
import { HttpStatus } from '@nestjs/common';

export abstract class HttpStatusMapper {
  private static readonly _map = new Map<EXCEPTION_CODE, HttpStatus>([
    [EXCEPTION_CODE.INVALID_INPUT, HttpStatus.BAD_REQUEST],
    [EXCEPTION_CODE.INVALID_SCHEMA, HttpStatus.BAD_REQUEST],
    [EXCEPTION_CODE.UNKNOWN, HttpStatus.INTERNAL_SERVER_ERROR],
    [EXCEPTION_CODE.DATABASE, HttpStatus.INTERNAL_SERVER_ERROR],
    [EXCEPTION_CODE.FORBBIDEN, HttpStatus.FORBIDDEN],
    [EXCEPTION_CODE.NOT_FOUND, HttpStatus.NOT_FOUND],
    [EXCEPTION_CODE.DEPRECATED, HttpStatus.MOVED_PERMANENTLY],
  ]);

  static byException(exception: AbstractException) {
    return HttpStatusMapper._map.get(exception.code) ?? HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
