import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/common/database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserAdminController } from './user.admin.controller';
import { UserProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, UserAdminController],
  providers: [...UserProviders, UserService],
  exports: [UserService, ...UserProviders],
})
export class UserModule {}
