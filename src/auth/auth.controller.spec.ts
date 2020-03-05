import {Test, TestingModule} from '@nestjs/testing';
import {AuthController} from './auth.controller';
import {AuthService} from "./auth.service";
import {UserModule} from "../user/user.module";
import {JwtModule} from '@nestjs/jwt';

describe('Auth Controller', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [UserModule, JwtModule.register({})]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should login', async () => {
    let result = {access_token: '123'}

    jest.spyOn(authService, 'login').mockImplementation(() => Promise.resolve(result));

    let user = {username: '123', userId: 1};
    controller.login({user: user})

    expect(await controller.login({user})).toBe(result);
  });
});
