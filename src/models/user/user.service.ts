import { Injectable, Inject, Logger, CACHE_MANAGER } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.mysql.entity';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from 'src/common/exceptions/business.exception';
import {
  fetchWeappToken,
  fetchWeappSession,
  fetchPhoneNumber,
} from '@/helper/weapp';
import {
  CreateUserDto,
  UpdateUserDto,
  WeappUserSession,
  CreateAdminDto,
} from './dto';

interface IToken {
  value: string;
  ttl: number;
}

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private APP_TOKEN_CACHE_KEY;
  private APP_TOKEN_CACHE_TTL;
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {
    this.APP_TOKEN_CACHE_KEY =
      this.configService.get('WEAPP_CONFIG').WEAPP_TOKEN_CACHE_KEY;
  }
  async createOrUpdateByWeapp(weappUserSession: WeappUserSession) {
    return await this.userRepository.save(weappUserSession as any);
  }

  async findOneByName(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [{ username }],
      withDeleted: false,
    });
    return user;
  }

  createUser(user: CreateAdminDto): Promise<User> {
    const newUser = this.userRepository.create({
      username: user.username,
      password: user.password,
    });

    return this.userRepository.save(newUser);
  }

  async getUserToken(code: string) {
    const data = await fetchWeappSession(code);
    if (data.errcode) {
      throw new BusinessException({
        code: data.errcode,
        message: data.errmsg,
      });
    }
    return data;
  }

  async getUserInfo(user) {
    const userInfo = await this.userRepository.findOne({
      where: {
        id: user.userId,
      },
      relations: ['company'],
    });
    if (!userInfo) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_NOLOGIN,
        message: '用户未登录',
      });
    }
    return userInfo;
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(userId, updateUserDto);
  }

  async getUserPhoneNumber(userId: number, code: string) {
    const tokenObj: IToken = await this.cacheManager.get(
      this.APP_TOKEN_CACHE_KEY,
    );
    const res = await fetchPhoneNumber(code, tokenObj.value);
    console.log(res);
    if (!res.errcode) {
      const phoneInfo = res.phone_info;
      await this.userRepository.save({
        id: userId,
        phoneNumber: phoneInfo.phoneNumber,
      });
      return phoneInfo.phoneNumber;
    } else {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.PHONE_INVALID,
        message: '获取手机号失败',
      });
    }
  }

  async findAll() {
    return this.userRepository.find({
      relations: ['company'],
    });
  }
}
