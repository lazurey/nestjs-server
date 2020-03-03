import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PagedQueryPipe } from './paged-query.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new PagedQueryPipe());
  await app.listen(3000);
}
bootstrap();
