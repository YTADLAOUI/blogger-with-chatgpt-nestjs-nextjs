import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  Schema as MongooseSchema } from 'mongoose';
export type ArticleDocument=HydratedDocument<Article>

@Schema({timestamps:true})

export class Article {
 @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  banner: string;

  @Prop({ type: String, maxlength: 200 })
  des: string;

  @Prop({ type: [String] })
  content: string[];

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'users' })
  author: string;

  @Prop({
    total_likes: { type: Number, default: 0 },
    total_comments: { type: Number, default: 0 },
    total_reads: { type: Number, default: 0 },
    total_parent_comments: { type: Number, default: 0 },
  })
  activity: {
    total_likes: number;
    total_comments: number;
    total_reads: number;
    total_parent_comments: number;
  };

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'comments' }] })
  comments: string[];

  @Prop({ type: Boolean, default: false })
  draft: boolean;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);