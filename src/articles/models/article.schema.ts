import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Activte } from '../dto/activte/activte';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
 class Activity  {
  @Prop({ default: 0 })
  total_likes: number;

  @Prop({ default: 0 })
  total_comments: number;

  @Prop({ default: 0 })
  total_reads: number;

  @Prop({ default: 0 })
  total_parent_comments: number;
}

//  const ActivitySchema = SchemaFactory.createForClass(Activity);

@Schema({ timestamps: true })
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

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'User' })
  author: MongooseSchema.Types.ObjectId;


  @Prop({ type: Activity, default: () => ({}) })
  activity: Activity;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Comment' }] })
  comments: MongooseSchema.Types.ObjectId[];

  @Prop({ type: Boolean, default: false })
  draft: boolean;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
