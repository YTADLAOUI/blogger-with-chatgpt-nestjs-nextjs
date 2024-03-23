import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuthService } from './auth.service';
import { User } from './models/user.schema';
import * as bcrypt from 'bcryptjs';

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
      const userId = 'user_id';
      const user = {
        _id: userId,
        username: 'testuser',
        email: email,
        profile_img: 'profile.jpg',
        role: 'user',
      };

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
  it('should update a user with provided ID and options', async () => {
   
    const userId = new Types.ObjectId();
    const options = { role: 'admin' };

    
    (userModel.updateOne as jest.Mock).mockResolvedValueOnce({ nModified: 1 }); 
    const result = await service.update(userId, options);

    
    expect(userModel.updateOne).toHaveBeenCalledWith({ _id: userId }, options);

    
    expect(result).toEqual({ nModified: 1 });
  });
  
it('should change user password', async () => {
  const userId = 'user_id';
  const currentPassword = 'old_password';
  const newPassword = 'new_password';
  const hashedPassword = '$2a$10$NLe8clLkUuMqApv/DX5uMO3GQe5kPhzKUmUPe9lWblKPO9p9p3o4M';

  const user = {
    _id: userId,
    password: hashedPassword,
    save: jest.fn(),
  };

  (userModel.findById as jest.Mock).mockResolvedValueOnce(user);
  jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);
  jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(hashedPassword as never);

  await service.changePassword(userId, currentPassword, newPassword);

  expect(userModel.findById).toHaveBeenCalledWith(userId);

  expect(bcrypt.compare).toHaveBeenCalledWith(currentPassword, user.password);

  expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, 10);

  expect(user.password).toEqual(hashedPassword);

  expect(user.save).toHaveBeenCalled();
});
it('should throw an error if user not found', async () => {
  const userId = 'user_id';
  const currentPassword = 'old_password';
  const newPassword = 'new_password';

  // Mocking findById to return undefined (user not found)
  (userModel.findById as jest.Mock).mockResolvedValueOnce(undefined);

  await expect(service.changePassword(userId, currentPassword, newPassword))
    .rejects.toThrowError('User not found');

  // Verifying that findById was called with the correct user ID
  expect(userModel.findById).toHaveBeenCalledWith(userId);
});

it('should throw an error if current password is incorrect', async () => {
  const userId = 'user_id';
  const currentPassword = 'old_password';
  const newPassword = 'new_password';

  
  const user = {
    _id: userId,
    password: '$2a$10$InvalidHash',
  };

  
  (userModel.findById as jest.Mock).mockResolvedValueOnce(user);

  
  jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never);

  await expect(service.changePassword(userId, currentPassword, newPassword))
    .rejects.toThrowError('Current password is incorrect');
  expect(userModel.findById).toHaveBeenCalledWith(userId); 
  expect(bcrypt.compare).toHaveBeenCalledWith(currentPassword, user.password);
});




it('should edit user profile', async () => {

  const userId = 'user_id';
  const username = 'new_username';
  const profileImg = 'new_profile_img.jpg';
  const bio = 'new_bio';

  const user = {
    _id: userId,
    username: 'old_username',
    email: 'test@example.com',
    profile_img: 'old_profile_img.jpg',
    bio: 'old_bio',
    role: 'user',
    save: jest.fn(),
  };

  (userModel.findById as jest.Mock).mockResolvedValueOnce(user);

  
  const result = await service.editProfile(userId, username, profileImg, bio);

 
  expect(userModel.findById).toHaveBeenCalledWith(userId);

 
  expect(user.username).toEqual(username);
  expect(user.profile_img).toEqual(profileImg);
  expect(user.bio).toEqual(bio);

  
  expect(user.save).toHaveBeenCalled();

  
  expect(result).toEqual({
    username: username,
    email: user.email,
    profile_img: profileImg,
    role: user.role,
    id: userId,
  });
});
it('should throw error if user is not found', async () => {
  // Données de test
  const userId = 'user_id';
  const username = 'new_username';
  const profileImg = 'new_profile_img.jpg';
  const bio = 'new_bio';

  (userModel.findById as jest.Mock).mockResolvedValueOnce(null);

  await expect(service.editProfile(userId, username, profileImg, bio)).rejects.toThrowError('User not found');

  expect(userModel.findById).toHaveBeenCalledWith(userId);
});
});