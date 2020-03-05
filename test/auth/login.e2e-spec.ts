import {Test, TestingModule} from '@nestjs/testing';
import {HttpStatus, INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../../src/app.module';
import {JwtAuthGuard} from "../../src/common/guards/jwt-auth.guard";
import {JwtService} from "@nestjs/jwt"

describe('LoginController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalGuards(new JwtAuthGuard());

    jwtService = app.get(JwtService);
    await app.init();
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({username: 'john', password: 'changeme'})
      .expect(HttpStatus.OK)
      .expect(res => 'auth_token' in res)
  });

  it('/moments (GET) unauthorized', () => {
    return request(app.getHttpServer())
      .post('/moments')
      .expect(HttpStatus.UNAUTHORIZED)
  });


  it('/moments (GET) success', () => {
    let auth_token = jwtService.sign({username: '123', userId: 1});
    return request(app.getHttpServer())
      .get('/moments')
      .set('Authorization', 'Bearer ' + auth_token)
      .expect(HttpStatus.OK)
  });


});
