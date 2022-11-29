import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateAdmin(username, password);

    if (!user) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_NOLOGIN,
        message: '用户登录失败',
      });
    }
    return user;
  }
}
