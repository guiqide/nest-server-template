import { CODE2SESSION_URL, ACCESSTOKEN_URL, PHONE_NUMBER_URL } from './const';
import { methodV } from 'src/utils/request';

import { getConfig } from '@/utils';

const {
  WEAPP_CONFIG: { APPID, APPSECRET },
} = getConfig();

export type IWeappSession = {
  openid: string;
  session_key: string;
  unionid: string;
  errcode?: number;
  errmsg?: string;
};

export type IWeappToken = {
  access_token: string;
  expires_in: number;
  errcode?: number;
};

// 请求用户的session
export const fetchWeappSession = async (code) => {
  const { data } = await methodV({
    url: CODE2SESSION_URL,
    method: 'GET',
    query: {
      appid: APPID,
      secret: APPSECRET,
      js_code: code,
      grant_type: 'authorization_code',
    },
  });

  return data as IWeappSession;
};

// 跟微信请求全局access_token
export const fetchWeappToken = async () => {
  const { data } = await methodV({
    url: ACCESSTOKEN_URL,
    method: 'GET',
    query: {
      appid: APPID,
      secret: APPSECRET,
      grant_type: 'client_credential',
    },
  });

  return data as IWeappToken;
};

export const fetchPhoneNumber = async (code, token) => {
  const { data } = await methodV({
    url: PHONE_NUMBER_URL,
    method: 'POST',
    query: {
      access_token: token,
    },
    params: {
      code,
    },
  });

  return data;
};

export const getUserToken = async ({ code, app_token }) => {
  const data = fetchWeappSession(code);
  return data;
};
