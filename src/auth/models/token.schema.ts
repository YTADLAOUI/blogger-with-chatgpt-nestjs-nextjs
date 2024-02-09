import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TokrenDocument = HydratedDocument<Token>;

@Schema({ timestamps: true })

export class Token {
    @Prop({ required: true })
    user_id: string;
    @Prop({ required: true })
    token: string;
    @Prop({ required: true })
    expire_at: Date;
}
export const tokenSchema = SchemaFactory.createForClass(Token);