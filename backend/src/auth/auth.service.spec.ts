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
            updateOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('save', () => {
      it('should save a new user', async () => {
        const body = { 
          email: 'test@gmail.com',
          password: 'Y123456789',
          username: 'example',
          profile_img: 'example.jpg',
        };
        const createdUser = { 
          _id: '1234567890',
          email: 'test@gmail.com',
          password: 'Y123456789',
          username: 'example',
          profile_img: 'example.jpg',
        };
  
        const result = await service.save(body);
  
         expect(service.save).toHaveBeenCalledWith(body);
        expect(result).toEqual(createdUser);
      });
   
  });

  describe('findOne', () => {
    it('should find a user by email', async () => {
      const email = 'test@example.com';
      const user = { /* provide the expected user object */ };

      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(user);

      const result = await service.findOne(email);

      expect(userModel.findOne).toHaveBeenCalledWith({ email });
      expect(result).toEqual(user);
    });
  });

  describe('findOneById', () => {
    it('should find a user by id', async () => {
      const id = '1234567890';
      const user = {
        _id: id,
        email: 'test@example.com',
        password: 'Y123456789',
        username: 'test',
        profile_img: 'test.jpg',
        role: 'user', // Added role field
        select: jest.fn(), // Mock select function
      };

      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(user);

      const result = await service.findOneById(id);

      expect(userModel.findOne).toHaveBeenCalledWith({ _id: id });
      expect(result).toEqual(user);
    });
  });
});
