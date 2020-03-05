import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {PagedQueryPipe} from './paged-query.pipe';
import {JwtAuthGuard} from "./common/guards/jwt-auth.guard";
import {ValidationPipe} from "@nestjs/common";
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new PagedQueryPipe(), new ValidationPipe());
  app.useGlobalGuards(new JwtAuthGuard());
  app.use(helmet());
  await app.listen(3000);
}

bootstrap();
