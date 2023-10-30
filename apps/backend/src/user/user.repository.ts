import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { User } from "../schema/user.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, FilterQuery, Model, Types, UpdateQuery } from "mongoose";

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  protected logger =  new Logger(UserRepository.name)

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() connection: Connection
  ) {
    super(userModel, connection)
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findOne(filterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(filterQuery);
  }

  async find(filterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(filterQuery);
  }
  
  async findOneAndUpdate(filterQuery: FilterQuery<User>, user: UpdateQuery<User>): Promise<User> {
    return this.userModel.findOneAndUpdate(filterQuery, user);
  }

  async deleteOne(id: Types.ObjectId): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}