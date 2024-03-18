import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article, ArticleSchema } from './models/article.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [MongooseModule.forFeature([{name:Article.name,schema:ArticleSchema}]),CloudinaryModule,NotificationsModule ],
  providers: [ArticlesService],
  controllers: [ArticlesController]
})
export class ArticlesModule {}
