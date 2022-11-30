import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtUserConstants } from '../constants';

// const cookieExtractor = function (req: Request) {
//   let token = null;
//   if (req && req.cookies) {
//     token = req.cookies['project_access_token'];
//   }
//   return token;
// };

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: jwtUserConstants.ignoreExpiration,
      secretOrKey: jwtUserConstants.secret,
    });
  }

  async validate(payload: AdminPayload): Promise<AdminPayload> {
    return { ...payload };
  }
}
