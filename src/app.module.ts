import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { UserModule } from './models/user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './models/auth/auth.module';
import { WeappAccessTokenTasksService } from './schedule/weapp-access-token-task.service';
import { AppService } from './app.service';
import { getConfig } from './utils';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: getConfig('REDIS_CONFIG').host,
      port: getConfig('REDIS_CONFIG').port,
      auth_pass: getConfig('REDIS_CONFIG').auth,
      db: getConfig('REDIS_CONFIG').db,
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, WeappAccessTokenTasksService],
})
export class AppModule {}
