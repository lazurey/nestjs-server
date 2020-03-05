import {Controller, HttpCode, HttpStatus, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "../common/guards/local-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }


}
