import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { RestHandler } from '../handlers/rest.handler';

export const RequestHandler = createParamDecorator(async (Schema: ClassConstructor<any>, ctx: ExecutionContext) => {
  const httpContext = ctx.switchToHttp();
  const request = httpContext.getRequest();
  const response = httpContext.getResponse();

  return new RestHandler({ request, response, Schema });
});
