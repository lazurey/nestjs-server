import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {PagedQueryPipe} from './paged-query.pipe';
import {JwtAuthGuard} from "./common/guards/jwt-auth.guard";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new PagedQueryPipe());
  app.useGlobalGuards(new JwtAuthGuard())
  await app.listen(3000);
}

bootstrap();
