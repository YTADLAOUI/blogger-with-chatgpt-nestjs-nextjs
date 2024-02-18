import { Prop, Schema, SchemaFactory, } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { User } from "src/auth/models/user.schema";

export type OpenAiDocument = HydratedDocument<OpenAi>;


@Schema({ timestamps: true })

export class OpenAi{
  @Prop({ required: true })
  prompt: string;
  @Prop({ required: true })
  text: string;
  @Prop({ type: User }) 
  user: User;
}

export const openAiSchema = SchemaFactory.createForClass(OpenAi);