// feishu-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class WeappAuthGuard extends AuthGuard('weapp') {}
