import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(UsersModule);
  // app.useStaticAssets(join(__dirname, '../../email-templates'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'server/email-templates'));
  app.setViewEngine('ejs');
  app.enableCors({ origin: '*' });
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
