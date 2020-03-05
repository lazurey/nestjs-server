import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import {UserModule} from "../user/user.module";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [JwtModule.register({}), UserModule]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
