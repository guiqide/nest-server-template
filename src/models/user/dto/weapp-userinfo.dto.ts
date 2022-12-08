import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';

// export class WeappDto {
//   @IsNotEmpty()
//   @IsEnum(RECEIVE_TYPE)
//   @ApiProperty({ example: 'email', enum: RECEIVE_TYPE })
//   receive_id_type: RECEIVE_TYPE;

//   @IsNotEmpty()
//   @ApiProperty({ example: 'cookieboty@qq.com' })
//   receive_id?: string;

//   @IsNotEmpty()
//   @ApiProperty({ example: '{"text":" test content"}' })
//   content?: string;

//   @IsNotEmpty()
//   @IsEnum(MSG_TYPE)
//   @ApiProperty({ example: 'text', enum: MSG_TYPE })
//   msg_type?: MSG_TYPE;
// }
export class WeappUserInfo {
  openid: string;
  avatarUrl?: string;
  nickName?: string;
  phoneNumber?: string;
  role?: string;
}

export class WeappUserSession {
  id?: string;
  openid: string;
  session_key?: string;
  unionid?: string;
  errcode?: number;
  errmsg?: string;
}
