import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/moments (GET)', () => {
    return request(app.getHttpServer())
      .get('/moments')
      .expect(200)
      .then((response) => {
        expect(response.body.items).toHaveLength(20);
      });
  });

  it('/moments/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/moments/0')
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(0);
      });
  });
});
