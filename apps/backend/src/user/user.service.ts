import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { User } from '../schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async createUser(userName: string, emailAddress: string): Promise<User> {
    const user = { userName, emailAddress, _id: new Types.ObjectId()}
    return this.userRepository.create(user)
  }

  async getUserByEmailAddress(emailAddress: string): Promise<User> {
    return this.userRepository.findOne({ emailAddress })
  }

  async getUserByAccountNumber(accountNumber: number): Promise<User> {
    return this.userRepository.findOne({ accountNumber })
  }

  async getUserByIdentityNumber(identityNumber: number): Promise<User> {
    return this.userRepository.findOne({ identityNumber })
  }

  async updateUserByAccountNumber(accountNumber: number, data: UpdateUserDto): Promise<User> {
    return this.userRepository.findOneAndUpdate({ accountNumber }, data)
  }

  async deleteUserById(id: Types.ObjectId) {
    return this.userRepository.deleteOne(id)
  }

}
