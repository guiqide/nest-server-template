import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { getEnv } from './utils/config';
import { generateDocument } from './doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  app.use(cookieParser('project_access_token'));

  // 启动全局字段校验，保证请求接口字段校验正确。
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // NOTE: 本地启用hmr，但是无法自动更新entity，需要手动更新
  // 使用hotdev命令切换hrm方式本地运行
  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }

  // 创建swagger文档
  generateDocument(app);

  if (getEnv() === 'dev') {
    app.enableCors();
  }
  await app.listen(3000);
}
bootstrap();
