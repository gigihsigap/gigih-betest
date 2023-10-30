import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { DatabaseModule } from '@app/common';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schema/user.schema';
import { UserController } from './user.controller';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required()
      }),
      envFilePath: './.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{
      name: User.name, schema: UserSchema
    }]),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
  controllers: [UserController]
})

export class UserModule {}
