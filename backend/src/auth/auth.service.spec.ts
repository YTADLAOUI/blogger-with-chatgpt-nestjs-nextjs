import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from './auth.service';
import { User } from './models/user.schema';

describe('AuthService', () => {
  let service: AuthService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            findById: jest.fn(),
            updateOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', () => {
    expect(userModel).toBeDefined();
  });

  describe('save', () => {
    it('should save a new user', async () => {
      // Données de test
      const username = 'testuser';
      const email = 'test@test.com';
      const password = 'password';
      const saveMock = jest.fn().mockResolvedValue({
        username,
        email,
        password
      });
      jest.spyOn(service, 'save').mockImplementation(saveMock);

      const createdUser = await service.save({ username, email, password });

      expect(saveMock).toHaveBeenCalledTimes(1);
      expect(saveMock).toHaveBeenCalledWith({ username, email, password });
      expect(createdUser).toEqual({ username, email, password });
    });
  });
  

  

});