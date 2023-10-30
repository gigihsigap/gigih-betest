import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class User extends AbstractDocument {
    @Prop({ unique: true })
    userName: string;

    @Prop({ default: () => Math.floor(Math.random() * 1000000), unique: true })
    accountNumber?: number;

    @Prop()
    emailAddress: string;

    @Prop({ default: () => Math.floor(Math.random() * 1000000), unique: true })
    identityNumber?: number;    
}

export const UserSchema = SchemaFactory.createForClass(User)