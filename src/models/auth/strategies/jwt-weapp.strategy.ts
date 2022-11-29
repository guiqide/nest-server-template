import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtUserConstants } from '../constants';

@Injectable()
export class JwtWeappStrategy extends PassportStrategy(Strategy, 'jwt-weapp') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: jwtUserConstants.ignoreExpiration,
      secretOrKey: jwtUserConstants.secret,
    });
  }

  async validate(payload: UserPayload): Promise<UserPayload> {
    return { ...payload };
  }
}
