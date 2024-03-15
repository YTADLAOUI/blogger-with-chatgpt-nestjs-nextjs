import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
const profile_imgs_name_list = ["Garfield", "Tinkerbell", "Annie", "Loki", "Cleo", "Angel", "Bob", "Mia", "Coco", "Gracie", "Bear", "Bella", "Abby", "Harley", "Cali", "Leo", "Luna", "Jack", "Felix", "Kiki"];
const profile_imgs_collections_list = ["notionists-neutral", "adventurer-neutral", "fun-emoji"];
@Schema({ timestamps: true })
export class User {

    @Prop({ required: true })
    username: string;
    
    @Prop({ required: true , unique: true ,isemail: true})
    email: string;
    
    @Prop({ required: true })
    password: string;
    
    @Prop({
        type: String,
        default: () => {
          return `https://api.dicebear.com/6.x/${profile_imgs_collections_list[Math.floor(Math.random() * profile_imgs_collections_list.length)]}/svg?seed=${profile_imgs_name_list[Math.floor(Math.random() * profile_imgs_name_list.length)]}`
        } 
    })
    profile_img: string;
    
    @Prop({enum: ['admin'], default: 'admin'})
    role: string;


}

export const userSchema = SchemaFactory.createForClass(User);