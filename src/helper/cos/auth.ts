import * as COS from 'cos-nodejs-sdk-v5';
import { SecretId, SecretKey } from './constants';
export const cos = new COS({
  SecretId: SecretId,
  SecretKey: SecretKey,
});
