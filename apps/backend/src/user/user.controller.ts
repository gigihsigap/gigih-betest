import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { Types } from 'mongoose';
import { Public } from '@app/common/auth/auth.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Public()
  @Get('account/:number')
  async getUserByAccountNumber(@Param('number') number: number): Promise<User> {
    return this.userService.getUserByAccountNumber(number)
  }

  @Public()
  @Get('identity/:number')
  async getUserByIdentityNumber(@Param('number') number: number): Promise<User>  {
    return this.userService.getUserByIdentityNumber(number)
  }

  @Put('account/:number')
  async updateUserByAccountNumber(@Param('number') number: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.updateUserByAccountNumber(number, updateUserDto);
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: Types.ObjectId): Promise<User> {
    return this.userService.deleteUserById(id);
  }
}
