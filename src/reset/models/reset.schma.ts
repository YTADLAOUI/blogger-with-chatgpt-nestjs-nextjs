import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TokrenDocument = HydratedDocument<Reset>;

@Schema({ timestamps: true })

export class Reset {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true,unique: true})
    token: string;
    
}
export const resetSchema = SchemaFactory.createForClass(Reset);