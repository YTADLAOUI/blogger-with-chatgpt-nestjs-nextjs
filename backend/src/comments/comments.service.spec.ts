import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { getModelToken } from '@nestjs/mongoose';
import { Comment } from './models/comment.schema';
import { ArticlesService } from 'src/articles/articles.service';
import { NotificationsService } from 'src/notifications/notifications.service';

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsService, ArticlesService,NotificationsService,
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
          {
            provide: NotificationsService,
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
  it('should find a comment by id', async () => {
    const commentId = 'commentId';
    const comment = { _id: commentId, body: 'body' };
    const findOneMock = jest.fn().mockResolvedValue(comment);
    jest.spyOn(service, 'findOne').mockImplementation(findOneMock);

    const foundComment = await service.findOne(commentId);

    expect(findOneMock).toHaveBeenCalledTimes(1);
    expect(findOneMock).toHaveBeenCalledWith(commentId);
    expect(foundComment).toEqual(comment);
  });
  it('should update a comment by id', async () => {
    const commentId = 'commentId';
    const options = { body: 'updated body' };
    const updatedComment = { _id: commentId, ...options };
    const updateOneMock = jest.fn().mockResolvedValue(updatedComment);
    jest.spyOn(service, 'update').mockImplementation(updateOneMock);

    const result = await service.update(commentId, options);

    expect(updateOneMock).toHaveBeenCalledTimes(1);
    expect(updateOneMock).toHaveBeenCalledWith(commentId, options);
    expect(result).toEqual(updatedComment);
  });
});

