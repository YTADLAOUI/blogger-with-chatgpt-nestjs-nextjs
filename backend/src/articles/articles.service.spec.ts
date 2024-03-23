import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticlesService } from './articles.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { NotificationsService } from '../notifications/notifications.service';
import { Article } from './models/article.schema';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Notification } from 'src/notifications/models/notification.schema';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let articleModel: Model<Article>;
  let notificationModel: Model<Notification>;
  let cloudinaryService: CloudinaryService;
  let notificationsService: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        CloudinaryService,
        NotificationsService,
        {
          provide: getModelToken(Article.name),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            findOneAndUpdate: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
            countDocuments: jest.fn(),
          },
        },
        {
          provide: getModelToken(Notification.name),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            findOneAndUpdate: jest.fn(),
            updateOne: jest.fn(),
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
  it('should be defined', () => {
    expect(cloudinaryService).toBeDefined();
  });
  it('should be defined', () => {
    expect(notificationsService).toBeDefined();
  });
  it('should save a new article', async () => {
    // Données de test
    const title = 'Test Title';
    const banner = 'test-banner.jpg';
    const content = 'Lorem ipsum dolor sit amet';
    const tags = ['tag1', 'tag2'];
    const authorId = 'author123';

    const saveMock = jest.fn().mockResolvedValue({
      title,
      banner,
      content,
      tags,
      author: authorId,
    });
    jest.spyOn(service, 'save').mockImplementation(saveMock);

    const createdArticle = await service.save({
      title,
      banner,
      content,
      tags,
      author: authorId,
    });
    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(saveMock).toHaveBeenCalledWith({
      title,
      banner,
      content,
      tags,
      author: authorId,
    });
    expect(createdArticle).toEqual({
      title,
      banner,
      content,
      tags,
      author: authorId,
    });
  });
  it('should return count of non-draft articles', async () => {
    const count = 5;
    articleModel.countDocuments = jest.fn().mockResolvedValue(count);

    expect(await service.allLatestBlogs()).toBe(count);
    expect(articleModel.countDocuments).toHaveBeenCalledWith({ draft: false });
  });
  it('should handle errors from countDocuments', async () => {
    const error = new Error('Database error');
    articleModel.countDocuments = jest.fn().mockRejectedValue(error);
  
    try {
      await service.allLatestBlogs();
    } catch (e) {
      expect(e).toBe(error);
    }
  
    expect(articleModel.countDocuments).toHaveBeenCalledWith({ draft: false });
  });
  
});
