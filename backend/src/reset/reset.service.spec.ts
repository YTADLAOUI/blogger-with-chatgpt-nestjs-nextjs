import { Test, TestingModule } from '@nestjs/testing';
import { ResetService } from './reset.service';
import { getModelToken } from '@nestjs/mongoose';
import { Reset } from './models/reset.schma';



describe('ResetService', () => {
  let service: ResetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResetService,
      {
        provide: getModelToken(Reset.name),
        useValue: {
          find: jest.fn(),
          findOne: jest.fn(),
          save: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        },
      },
      ],
    }).compile();

    service = module.get<ResetService>(ResetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
