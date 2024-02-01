import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {

    @Prop({ required: true })
    username: string;
    
    @Prop({ required: true , unique: true ,isemail: true})
    email: string;
    
    @Prop({ required: true })
    password: string;
    
    @Prop({enum: ['admin'], default: 'admin'})
    role: string;

}

export const userSchema = SchemaFactory.createForClass(User);