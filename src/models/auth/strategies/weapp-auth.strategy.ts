// feishu-auth.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Request, Response } from 'express';
import { Injectable, Query, UnauthorizedException } from '@nestjs/common';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-custom';

@Injectable()
export class WeappStrategy extends PassportStrategy(Strategy, 'weapp') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: Request): Promise<UserPayload> {
    const q: any = req.query;

    const user = await this.authService.validateWeappUser(q.code as string);

    if (!user) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_NOLOGIN,
        message: '用户未登录',
      });
    }

    return user;
  }
}
