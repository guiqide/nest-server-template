import { IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginWeappDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'code' })
  code: string;
}
