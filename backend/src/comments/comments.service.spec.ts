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
});
