import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserModule} from "../user/user.module";
import {LocalStrategy} from "./local.strategy";
import {PassportModule} from "@nestjs/passport";
import {jwtConstants} from "./constants";
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from "./jwt.strategy";
import { AuthController } from './auth.controller';
import {SessionSerializer} from "./session.serializer";

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, SessionSerializer],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '600s'},
    }),
    UserModule,

  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {
}