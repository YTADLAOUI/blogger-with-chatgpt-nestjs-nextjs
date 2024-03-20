
import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let articleModel: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getModelToken('Article'),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            save: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockResolvedValue([]),
            countDocuments: jest.fn().mockResolvedValue(0),
            findOneAndUpdate: jest.fn().mockResolvedValue({}),
            deleteOne: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    articleModel = module.get<Model<any>>(getModelToken('Article'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('save', () => {
    it('should save an article', async () => {
      const body = {}; // Provide the necessary body data for the test
      const createdArticle = {}; // Provide the expected created article object

      jest.spyOn(articleModel.prototype, 'save').mockResolvedValueOnce(createdArticle);

      const result = await service.save(body);

      expect(articleModel.prototype.save).toHaveBeenCalledWith();
      expect(result).toEqual(createdArticle);
    });
  });

  describe('findAll', () => {
    it('should find all articles', async () => {
      const page = 1; // Provide the necessary page number for the test
      const blogs = []; // Provide the expected blogs array

      jest.spyOn(articleModel, 'find').mockReturnValueOnce({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(blogs),
      } as any); // Add 'as any' to fix the type error

      const result = await service.findAll(page);

      expect(articleModel.find).toHaveBeenCalledWith({ draft: false });
      expect(result).toEqual(blogs);
    });
  });

  // Add more test cases for other methods
  describe('allLatestBlogs', () => {
    it('should return the count of all latest blogs', async () => {
      const count = 5; // Provide the expected count of latest blogs

      jest.spyOn(articleModel, 'countDocuments').mockResolvedValueOnce(count);

      const result = await service.allLatestBlogs();

      expect(articleModel.countDocuments).toHaveBeenCalledWith({ draft: false });
      expect(result).toEqual(count);
    });

    it('should handle errors and log them', async () => {
      const error = new Error('Internal Server Error');
      console.error = jest.fn(); // Mock console.error

      jest.spyOn(articleModel, 'countDocuments').mockRejectedValueOnce(error);

      await expect(service.allLatestBlogs()).rejects.toThrow(error);
      expect(console.error).toHaveBeenCalledWith('Error fetching articles:', error);
    });
  });

});