import { cos } from './auth';
import {
  region,
  SecretId,
  SecretKey,
  contractBucket,
  caseBucket,
} from './constants';

export function getContractUrl(objectKey: string) {
  return new Promise((resolve, reject) => {
    cos.getObjectUrl(
      {
        Bucket: contractBucket,
        Region: region,
        Key: objectKey /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
        // Sign: true,
        Expires: 3600, // 单位秒
      },
      function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      },
    );
  });
}

export function getCaseAttachmentUrl(objectKey: string) {
  return new Promise((resolve, reject) => {
    cos.getObjectUrl(
      {
        Bucket: caseBucket,
        Region: region,
        Key: objectKey /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
        // Sign: true,
        Expires: 3600, // 单位秒
      },
      function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      },
    );
  });
}
