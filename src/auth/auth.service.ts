import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.schema';
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async save(body:any){
    console.log("first")
    console.log(body)
    const createdUser= new this.userModel(body);
    console.log('reer',createdUser)
    await createdUser.save();
    return createdUser;
  }
  async findOne(email: string){
    const user = await this.userModel.findOne({ email });
    return user;
  }
  async findOneById(id: string){
    const user = await this.userModel.findOne({ _id:id });
    return user;
  }
}
