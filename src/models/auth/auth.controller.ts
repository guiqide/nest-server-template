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
import { Public } from './constants';
import { WeappAuthGuard, AdminAuthGuard } from './guards';
import { AuthService } from './auth.service';
import { LoginWeappDto } from '@/models/user/dto';
import { LoginAdminDto } from '@/models/user/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async getTokenInfo(@PayloadUser() user: UserPayload) {
    return user;
  }

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

  @ApiOperation({
    summary: '后台管理端登录',
    description: '用户名和密码',
  })
  @UseGuards(AdminAuthGuard)
  @Public()
  @Post('/admin/login')
  async getAdminTokenByWeb(@PayloadUser() user: AdminPayload) {
    const { accessToken } = await this.authService.loginAdmin(user);
    return {
      accessToken,
    };
  }

  // @ApiOperation({
  //   summary: '后台管理端登录',
  //   description: '用户名和密码',
  // })
  // @UseGuards(AdminAuthGuard)
  // @Public()
  // @Post('/admin/logout')
  // async logoutByWeb(@Res({ passthrough: true }) res: Response) {
  //   res.cookie('project_access_token', null, {
  //     path: '/',
  //     httpOnly: true,
  //     expires: new Date(0),
  //   });
  //   res.cookie('project_access_token_expires_in', +new Date(0), {
  //     path: '/',
  //     expires: new Date(0),
  //   });
  //   return null;
  // }
}
