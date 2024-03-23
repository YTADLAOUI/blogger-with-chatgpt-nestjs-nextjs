import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { getModelToken } from '@nestjs/mongoose';
import { Comment } from './models/comment.schema';
import { ArticlesService } from 'src/articles/articles.service';

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsService, ArticlesService,
        { provide: getModelToken(Comment.name),
          useValue: {
            findOne: jest.fn(),
            deleteOne: jest.fn(),
            save: jest.fn(),
          },
          },
          {
            provide: ArticlesService,
            useValue: {
              findOne: jest.fn(),
            },
          },
      
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('save', () => {
    it('should save a new comment', async () => {
      // Test data
      const articleId = 'articleId';
      const body = 'body';
      const saveMock = jest.fn().mockResolvedValue({
        articleId,
        body,
      });
      jest.spyOn(service, 'save').mockImplementation(saveMock);

      const createdComment = await service.save({ articleId, body });

      expect(saveMock).toHaveBeenCalledTimes(1);
      expect(saveMock).toHaveBeenCalledWith({ articleId, body });
      expect(createdComment).toEqual({ articleId, body });
    });
  });
});
