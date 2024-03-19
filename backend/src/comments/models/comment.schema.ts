import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
export type CommentDocument= HydratedDocument<Comment>

@Schema({timestamps:true})

export class Comment{
    @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'Article' })
    article_id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'Article' })
  article_author: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, required: true })
  comment: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'User' })
  commented_by: MongooseSchema.Types.ObjectId;

 

}
export const CommentSchema = SchemaFactory.createForClass(Comment);