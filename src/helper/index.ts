import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PayloadUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const PayloadAdmin = createParamDecorator(
  (data, ctx: ExecutionContext): AdminPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
