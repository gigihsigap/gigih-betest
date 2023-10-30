import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '@app/common/auth/auth.decorator';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}
  
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('refresh-token')
  async signIn() {
    return this.authService.refreshToken();
  }

  @Get('protected')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto.emailAddress, createUserDto.userName)
  }
}
