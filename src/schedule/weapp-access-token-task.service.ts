/**
 * NOTE: 本地的docker因为时间少8小时，所以不会更新
 */
import { Injectable, Logger, CACHE_MANAGER, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { fetchWeappToken, fetchWeappSession } from '@/helper/weapp';

interface IToken {
  value: string;
  ttl: number;
}
@Injectable()
export class WeappAccessTokenTasksService {
  private readonly logger = new Logger(WeappAccessTokenTasksService.name);
  private APP_TOKEN_CACHE_KEY;
  private APP_TOKEN_CACHE_TTL;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {
    this.APP_TOKEN_CACHE_KEY =
      this.configService.get('WEAPP_CONFIG').WEAPP_TOKEN_CACHE_KEY;
    this.APP_TOKEN_CACHE_TTL =
      this.configService.get('WEAPP_CONFIG').WEAPP_TOKEN_CACHE_TTL;
  }

  // NOTE: 其实可以落DB，然后过期后回源
  @Cron('5 * * * * *')
  async handleCron() {
    this.logger.debug('该方法将在30秒标记处每分钟运行一次');
    this.logger.debug(this.APP_TOKEN_CACHE_KEY);
    const tokenObj: IToken = (await this.cacheManager.get(
      this.APP_TOKEN_CACHE_KEY,
    )) ?? { value: '', ttl: 0 };
    try {
      console.log(new Date(tokenObj.ttl), new Date(Date.now() + 300000));

      if (!tokenObj || tokenObj.ttl < Date.now() + 300000) {
        const data = await fetchWeappToken();
        if (!data.errcode) {
          tokenObj.value = data.access_token;
          tokenObj.ttl = Date.now() + data.expires_in * 1000;
          this.logger.debug(`获取最新的token过期时间为：${tokenObj.ttl}`);
          await this.cacheManager.set(
            this.APP_TOKEN_CACHE_KEY,
            tokenObj,
            data.expires_in,
          );
        } else {
          this.logger.error(`获取微信access_token失败:${JSON.stringify(data)}`);
        }
      }
    } catch (e) {
      this.logger.error(`access_token已不存在: ${e}`);
    }
  }
}
