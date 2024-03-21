import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './models/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async save(body:any){
    const createdUser= new this.userModel(body);
    await createdUser.save();
    return createdUser;
  }
  async findOne(email: string){
    const user = await this.userModel.findOne({ email });
    return user;
  }
  async findOneById(id: string){
    const user = await this.userModel.findOne({ _id:id }).select('username email profile_img role');
    return user;
  }
  async update(id: Types.ObjectId,options){
    return await this.userModel.updateOne({ _id: id },options);
  }
  async changePassword(id: string, currentPassword: string, newPassword: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }

    user.password =await  bcrypt.hash(newPassword, 10), newPassword;
    await user.save();

    return user;
  }
}
