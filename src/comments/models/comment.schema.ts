import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
export type CommentDocument= HydratedDocument<Comment>

@Schema({timestamps:true})

export class Comment{
    @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'Article' })
    article_id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'Article' })
  article_author: string;

  @Prop({ type: String, required: true })
  comment: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Comment' })
  children: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'User' })
  commented_by: string;

  @Prop({ type: Boolean })
  isReply: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Comment' })
  parent: string;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);