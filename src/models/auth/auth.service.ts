import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '@/models/user/user.service';
import { WeappUserSession } from '@/models/user/dto/weapp-userinfo.dto';
import { User } from '@/models/user/entities/user.entity';
import { BusinessException, BUSINESS_ERROR_CODE } from '@/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private userService: UserService,
  ) {}

  // 直接注册或者更新
  async validateWeappUser(code): Promise<UserPayload> {
    // 可能是已经有的用户，或者只有token
    const weappUserSession: any = await this.getWeappTokenByApplications(code);

    // 将微信的用户信息同步到数据库
    const user: User = await this.userService.createOrUpdateByWeapp(
      weappUserSession,
    );

    return {
      userId: user.id,
      openid: user.openid,
    };
  }

  async validateAdmin(username, password) {
    const user = await this.userRepository.findOneBy({
      username,
    });

    if (!user) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.PASSWORD_INVALID,
        message: '密码错误',
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.PASSWORD_INVALID,
        message: '密码错误',
      });
    }
    return {
      userId: user.id,
      username: user.username,
      role: user.role,
    };
  }

  // 获取用户的微信token
  async getWeappTokenByApplications(code: string) {
    const data = await this.userService.getUserToken(code);
    const weappUserSession: WeappUserSession = {
      openid: data.openid,
    };

    const user = await this.userRepository.findOneBy({
      openid: weappUserSession.openid,
    });

    if (user) {
      return user;
    } else {
      return data;
    }
  }

  // jwt 登录
  async loginWeapp(user: UserPayload) {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }

  // jwt 登录
  async loginAdmin(user: AdminPayload) {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }
}
