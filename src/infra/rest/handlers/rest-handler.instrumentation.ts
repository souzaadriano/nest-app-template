import { AbstractInstrumentation } from '@/core/shared/class/log/instrumentation.abstract';
import { AbstractException } from '@/core/shared/exception/exception.abstract';
import { Request } from 'express';

export class RestHandlerInstrumentation extends AbstractInstrumentation {
  setRequest(request: Request) {
    const subContext = this._log.getSubContext('request');
    const { ip, method, params, path, query, url } = this._extractRequestLog(request);
    subContext.set('path', path);
    subContext.set('method', method);
    subContext.set('ip', ip);
    subContext.set('params', params);
    subContext.set('query', query);
    subContext.set('url', url);
  }

  private _extractRequestLog(request: Request) {
    return {
      path: request.route.path,
      method: request.method.toUpperCase(),
      ip: request.ip,
      params: request.params,
      query: request.query,
      url: request.path,
    };
  }

  setStatus(status: number) {
    this._log.subContext('request', 'status', status);
  }

  setException(exception: AbstractException) {
    this._log.exception(exception);
  }

  getLog() {
    return this._log;
  }
}
