import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtUserConstants } from '../constants';
import { Request } from 'express';
import { COOKIE_PREFIX } from '../constants';

const cookieExtractor = function (req: Request) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[COOKIE_PREFIX];
  }
  return token;
};

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: jwtUserConstants.ignoreExpiration,
      secretOrKey: jwtUserConstants.secret,
    });
  }

  async validate(payload: AdminPayload): Promise<AdminPayload> {
    return { ...payload };
  }
}
