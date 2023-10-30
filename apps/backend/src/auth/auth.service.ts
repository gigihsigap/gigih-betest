import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async refreshToken() {
    const payload = {};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
