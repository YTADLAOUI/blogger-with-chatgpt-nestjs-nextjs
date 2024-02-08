import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.schema';
import { RegisterAuth } from './dto/create-auth.dto';
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
  // async  update(email:string) {
  // const user = await this.userModel.findOne({ email });

  // }
  // create(createAuthDto: CreateAuthDto) {
  //   return 
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
