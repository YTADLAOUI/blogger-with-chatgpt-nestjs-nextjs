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
  
  

  describe('findOne', () => {
    it('should find a user by email', async () => {
      const email = 'test@example.com';
      const user = {};

      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(user);

      const result = await service.findOne(email);

      expect(userModel.findOne).toHaveBeenCalledTimes(1);
      expect(userModel.findOne).toHaveBeenCalledWith({ email });
      expect(result).toEqual(user);
    });
  });

  it('should find a user by ID and return selected fields', async () => {
    // Test data
    const userId = 'user_id';
    const userData = {
      _id: userId,
      username: 'testuser',
      email: 'test@example.com',
      profile_img: 'profile.jpg',
      role: 'user',
    };

    (userModel.findOne as jest.Mock).mockReturnValueOnce({
      select: jest.fn().mockResolvedValueOnce(userData),
    });
  
    const result = await service.findOneById(userId);
    expect(userModel.findOne).toHaveBeenCalledWith({ _id: userId });

    expect(result).toEqual(userData);
  });
  

});