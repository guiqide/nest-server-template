import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Query,
  Res,
  VERSION_NEUTRAL,
} from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { getConfig } from '@/utils/config';
import { PayloadUser } from '@/helper';
import { Response } from 'express';
import * as moment from 'moment';
import { Public, COOKIE_PREFIX } from './constants';
import { WeappAuthGuard, AdminAuthGuard, JwtAdminGuard } from './guards';
import { AuthService } from './auth.service';
import { LoginWeappDto } from '@/models/user/dto';
import { LoginAdminDto } from '@/models/user/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async getTokenInfo(@PayloadUser() user: UserPayload) {
    return user;
  }

  @ApiTags('用户——用户端')
  @ApiOperation({
    summary: '微信授权登录',
    description: '通过 code 获取`openid`',
  })
  @UseGuards(WeappAuthGuard)
  @Public()
  @Get('/login')
  async getWeappTokenByApplications(
    @PayloadUser() user: UserPayload,
    @Query() query: LoginWeappDto,
  ) {
    const { accessToken } = await this.authService.loginWeapp(user);

    return {
      accessToken,
    };
  }

  @ApiTags('用户——管理端')
  @ApiOperation({
    summary: '后台管理端登录',
    description: '用户名和密码',
  })
  @Public()
  @Post('/admin/login')
  async getAdminTokenByWeb(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.loginAdmin(loginAdminDto);
    response.cookie(COOKIE_PREFIX, accessToken, {
      path: '/',
      httpOnly: true,
      expires: moment().add(1, 'd').toDate(),
    });
    return {
      accessToken,
    };
  }

  @ApiTags('用户——管理端')
  @ApiOperation({
    summary: '后台管理端登录',
    description: '用户名和密码',
  })
  @UseGuards(JwtAdminGuard)
  @Public()
  @Get('/admin/logout')
  async logoutByWeb(@Res({ passthrough: true }) res: Response) {
    res.cookie(COOKIE_PREFIX, null, {
      path: '/',
      httpOnly: true,
      expires: new Date(0),
    });
    res.cookie(COOKIE_PREFIX + '_expires_in', +new Date(0), {
      path: '/',
      expires: new Date(0),
    });
    return null;
  }
}
