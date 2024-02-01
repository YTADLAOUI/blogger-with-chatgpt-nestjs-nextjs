import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { User,UserDocument } from './models/user.schema';
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: UserDocument) {}

  async save(body){
    return await this.userModel.save(body);
  }
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
