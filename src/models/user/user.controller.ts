import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Public } from '@/models/auth/constants';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions';
import { PayloadUser } from '@/helper';
import { JwtWeappGuard, JwtAdminGuard } from '@/models/auth/guards';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginWeappDto } from './dto/login-weapp.dto';
// NOTE: 业务异常类
// import { BusinessException } from 'src/common/exceptions/business.exception';

@ApiTags('用户——用户端')
@UseGuards(JwtWeappGuard)
@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/userinfo')
  getUserInfo(@PayloadUser() user: UserPayload) {
    return this.userService.getUserInfo(user);
  }

  @Put('/userinfo')
  update(
    @PayloadUser() user: UserPayload,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(user.userId, updateUserDto);
  }

  @Get('/phone')
  async getUserPhoneNumber(
    @PayloadUser() user: UserPayload,
    @Query() query: LoginWeappDto,
  ) {
    return this.userService.getUserPhoneNumber(user.userId, query.code);
  }
}
