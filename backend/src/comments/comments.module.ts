import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './models/comment.schema';
import { ArticlesModule } from 'src/articles/articles.module';

@Module({
  imports: [MongooseModule.forFeature([{name:'Comment',schema:CommentSchema}]),ArticlesModule],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
