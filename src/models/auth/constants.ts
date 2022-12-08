import { SetMetadata } from '@nestjs/common';

export const jwtUserConstants = {
  secret: 'XH6PLoeLp2sKPR2y_AZd', // 秘钥，不对外公开。
  expiresIn: '10h', // 时效时长
  ignoreExpiration: true, // 是否忽略 token 时效
};

export const jwtAdminConstants = {
  secret: '!tKfJXRae792wFJK8-xw', // 秘钥，不对外公开。
  expiresIn: '10h', // 时效时长
  ignoreExpiration: true, // 是否忽略 token 时效
};

export const COOKIE_PREFIX = 'project_access_token';

export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
