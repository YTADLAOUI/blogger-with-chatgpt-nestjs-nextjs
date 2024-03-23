import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiService } from './openai.service';
import { getModelToken } from '@nestjs/mongoose';
import { OpenAi } from './models/openai.schema';

describe('OpenaiService', () => {
  let service: OpenaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenaiService,
      {
        provide: getModelToken(OpenAi.name),
        useValue: {
          findOne: jest.fn(),
          deleteOne: jest.fn(),
          save: jest.fn(),
        },
      }
      
      
      ],
    }).compile();

    service = module.get<OpenaiService>(OpenaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
