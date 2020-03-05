import { Test, TestingModule } from '@nestjs/testing';
import {HttpStatus, INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

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
      .expect(HttpStatus.OK)
      .expect('Hello World!');
  });

  it('/moments (GET)', () => {
    return request(app.getHttpServer())
      .get('/moments')
      .expect(HttpStatus.OK)
      .then((response) => {
        expect(response.body.items).toHaveLength(20);
      });
  });

  it('/moments/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/moments/0')
      .expect(HttpStatus.OK)
      .then((response) => {
        expect(response.body.id).toBe(0);
      });
  });
});
