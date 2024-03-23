import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticlesService } from './articles.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { NotificationsService } from '../notifications/notifications.service';
import { Article } from './models/article.schema';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let articleModel: Model<Article>;
  let cloudinaryService: CloudinaryService;
  let notificationsService: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NotificationsModule, CloudinaryModule],
      providers: [
        ArticlesService,
        {
          provide: getModelToken(Article.name),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            findOneAndUpdate: jest.fn(),
            updateOne: jest.fn(),
            save: jest.fn(),
            deleteOne: jest.fn(),
            countDocuments: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    articleModel = module.get<Model<Article>>(getModelToken(Article.name));
    cloudinaryService = module.get<CloudinaryService>(CloudinaryService);
    notificationsService = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Write additional test cases as needed for each method in ArticlesService

});
