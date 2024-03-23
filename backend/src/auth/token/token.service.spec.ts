import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { getModelToken } from '@nestjs/mongoose';
import { Token } from '../models/token.schema';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService,
      { provide: getModelToken(Token.name),
        useValue: {
          findOne: jest.fn(),
          deleteOne: jest.fn(),
          save: jest.fn(),
        },  
        }
      ],

    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
