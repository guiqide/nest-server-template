import { Module } from '@nestjs/common';
import { UserModule } from '@/models/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtUserConstants } from './constants';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtWeappStrategy } from './strategies/jwt-weapp.strategy';
import { JwtAdminStrategy } from './strategies/jwt-admin.strategy';
import { WeappStrategy } from './strategies/weapp-auth.strategy';
import { AdminStrategy } from './strategies/admin-auth.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtUserConstants.secret,
      signOptions: { expiresIn: jwtUserConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtWeappStrategy,
    WeappStrategy,
    JwtAdminStrategy,
    AdminStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
