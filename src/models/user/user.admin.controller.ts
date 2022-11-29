import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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

@ApiTags('用户——管理端')
@UseGuards(JwtAdminGuard)
@Controller('/admin/user')
export class UserAdminController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Post('create')
  @Public()
  async createAdminUser(@Body() createAdminDto: CreateAdminDto) {
    const exist = await this.userService.findOneByName(createAdminDto.username);

    if (exist) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '用户名已存在',
      });
    }

    const user = await this.userService.createUser(createAdminDto);
    return user;
  }

  @Get('/userinfo')
  getUserInfo(@PayloadUser() user: UserPayload) {
    return this.userService.getUserInfo(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Get()
  getUserList() {
    return this.userService.findAll();
  }
}
